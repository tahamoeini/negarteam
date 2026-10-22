type EventProperties = Record<string, unknown>;

type PosthogEvent = {
  event?: unknown;
  properties?: EventProperties;
  [key: string]: unknown;
};

type PosthogQueue = Array<unknown>;

interface PosthogClient extends PosthogQueue {
  __SV?: number;
  _i?: Array<[string, PosthogOptions, string]>;
  capture: (eventName: string, properties?: EventProperties) => void;
  init: (token: string, options: PosthogOptions, alias?: string) => void;
  people?: PosthogQueue;
}

type PosthogOptions = {
  api_host: string;
  defaults: string;
  autocapture: boolean;
  capture_pageview: boolean;
  capture_pageleave: boolean;
  capture_dead_clicks: boolean;
  capture_exceptions: boolean;
  disable_session_recording: boolean;
  disable_surveys: boolean;
  disable_surveys_automatic_display: boolean;
  advanced_disable_flags: boolean;
  disable_compression: boolean;
  person_profiles: "never";
  persistence: "sessionStorage";
  logs: { captureConsoleLogs: boolean };
  session_recording: {
    maskAllInputs: boolean;
    maskTextSelector: string;
    maskAllElementAttributes: boolean;
    blockSelector: string;
    streamNetworkBody: boolean;
  };
  before_send: (event: PosthogEvent) => PosthogEvent | null;
  loaded: (instance: PosthogClient) => void;
};

declare global {
  interface Window {
    posthog?: PosthogClient;
    __APP_ANALYTICS__?: {
      trackFeature: (featureId: string, outcome?: string) => void;
      trackWorkflow: (step: string, outcome?: string) => void;
      trackIssue: (kind: string) => void;
      trackTiming: (step: string, elapsedMs: number) => void;
      trackPerformanceMetric: (metric: string, value: number) => void;
      trackPageView: () => void;
    };
  }
}
export {};

const appName = "Negar Team";
const projectToken = "__POSTHOG_PROJECT_TOKEN__";
const apiHost = new URL("/api/edge", window.location.origin).toString();
const productionBuild = import.meta.env.PROD;
const routeLabels: Readonly<Record<string, string>> = Object.freeze({"/":"home","/index.html":"home"});
const TRACKING_OPTIONS = Object.freeze({
  analytics: true,
  pageViews: true,
  interactions: true,
  featureFlags: true,
  autocapture: false,
  sessionReplay: false,
  surveys: false,
  exceptionCapture: false
});
const ACTION_IDS = new Set([
  "open", "close", "save", "delete", "import", "export", "search", "filter", "sort",
  "navigate", "submit", "cancel", "select", "toggle", "refresh", "copy", "download",
  "create", "update", "settings", "contact", "ocr", "scenario", "portfolio",
  "market-refresh", "watchlist", "project", "language", "perspective", "test-step",
  "source-import", "evidence", "claim", "matrix", "share", "chart"
]);
const OUTCOMES = new Set(["started", "completed", "failed"]);
const ACTION_LABELS = new Map<string, string>([
  ...["open", "open file", "открыть", "باز کردن", "打开"].map((value) => [value, "open"] as const),
  ...["close", "close dialog", "закрыть", "بستن", "关闭"].map((value) => [value, "close"] as const),
  ...["save", "save changes", "сохранить", "ذخیره", "保存"].map((value) => [value, "save"] as const),
  ...["delete", "remove", "удалить", "حذف", "删除"].map((value) => [value, "delete"] as const),
  ...["import", "import file", "импорт", "وارد کردن", "导入"].map((value) => [value, "import"] as const),
  ...["export", "export file", "экспорт", "خروجی", "导出"].map((value) => [value, "export"] as const),
  ...["search", "поиск", "جستجو", "搜索"].map((value) => [value, "search"] as const),
  ...["filter", "фильтр", "فیلتر", "筛选"].map((value) => [value, "filter"] as const),
  ...["sort", "sort by", "сортировка", "مرتب‌سازی", "排序"].map((value) => [value, "sort"] as const),
  ...["submit", "send", "отправить", "ارسال", "提交"].map((value) => [value, "submit"] as const),
  ...["cancel", "отмена", "لغو", "取消"].map((value) => [value, "cancel"] as const),
  ...["select", "выбрать", "انتخاب", "选择"].map((value) => [value, "select"] as const),
  ...["refresh", "reload", "обновить", "به‌روزرسانی", "刷新"].map((value) => [value, "refresh"] as const),
  ...["copy", "копировать", "کپی", "复制"].map((value) => [value, "copy"] as const),
  ...["download", "скачать", "دانلود", "下载"].map((value) => [value, "download"] as const),
  ...["create", "new", "создать", "ایجاد", "创建"].map((value) => [value, "create"] as const),
  ...["settings", "preferences", "настройки", "تنظیمات", "设置"].map((value) => [value, "settings"] as const),
  ...["contact", "contacts", "контакты", "تماس", "联系"].map((value) => [value, "contact"] as const),
  ...["share", "поделиться", "اشتراک‌گذاری", "分享"].map((value) => [value, "share"] as const)
]);
let interactionTrackingInstalled = false;
let lastPageRoute = "";

function currentRouteId() {
  const pathname = typeof window !== "undefined" && typeof window.location?.pathname === "string"
    ? window.location.pathname
    : "/";
  const path = pathname.replace(/\/+$/, "") || "/";
  return routeLabels[path] || "other";
}

function capture(eventName: string, properties: EventProperties) {
  const instance = window.posthog;
  if (instance && typeof instance.capture === "function") instance.capture(eventName, properties);
}

function trackFeature(featureId: string, outcome = "started") {
  if (!ACTION_IDS.has(featureId) || !OUTCOMES.has(outcome)) return;
  capture("feature_used", { feature_id: featureId, outcome });
}


/**
 * Privacy-preserving instrumentation contract.
 * Only predefined step identifiers, outcomes, issue types and numeric duration bands are accepted.
 * Never pass names, financial/document content, URLs, request bodies, or exception messages.
 */
const WORKFLOW_STEPS = new Set(["home","projects","project-detail","contact","language","external-link","test-step","theme","perspective"]);
const WORKFLOW_RESULTS = new Set(["started", "completed", "failed", "cancelled"]);
const ISSUE_KINDS = new Set(["runtime", "promise", "network", "validation", "timeout", "render", "storage", "unknown"]);
function trackWorkflow(step: string, outcome: string = "started") {
  if (WORKFLOW_STEPS.has(step) && WORKFLOW_RESULTS.has(outcome)) {
    capture("workflow_step", { step_id: step, outcome });
  }
}
function trackIssue(kind: string) {
  if (ISSUE_KINDS.has(kind)) capture("client_issue", { issue_kind: kind });
}
function trackTiming(step: string, elapsedMs: number) {
  if (!WORKFLOW_STEPS.has(step) || !Number.isFinite(elapsedMs) || elapsedMs < 0) return;
  const durationBand = elapsedMs < 100 ? "under_100ms" :
    elapsedMs < 500 ? "100_499ms" : elapsedMs < 2000 ? "500_1999ms" :
    elapsedMs < 10000 ? "2_9s" : "10s_plus";
  capture("workflow_timing", { step_id: step, duration_band: durationBand });
}
function installIssueTracking() {
  window.addEventListener("error", () => trackIssue("runtime"));
  window.addEventListener("unhandledrejection", () => trackIssue("promise"));
}


/** Coarse, content-free browser performance signals; not canonical Core Web Vitals. */
const PERF_METRICS = new Set(["ttfb", "fcp", "lcp", "cls"]);
const PERF_BANDS = new Set(["under_800ms", "800_2500ms", "2500_4000ms", "over_4000ms", "low", "medium", "high"]);
function trackPerformanceMetric(metric: string, value: number) {
  if (!PERF_METRICS.has(metric) || !Number.isFinite(value) || value < 0) return;
  const band = metric === "cls"
    ? value <= 0.1 ? "low" : value <= 0.25 ? "medium" : "high"
    : value < 800 ? "under_800ms" : value < 2500 ? "800_2500ms" : value < 4000 ? "2500_4000ms" : "over_4000ms";
  capture("client_performance", { metric_id: metric, metric_band: band });
}
function installPerformanceTracking() {
  const navigation = window.performance?.getEntriesByType?.("navigation")?.[0] as PerformanceNavigationTiming | undefined;
  if (navigation && Number.isFinite(navigation.responseStart)) {
    trackPerformanceMetric("ttfb", navigation.responseStart);
  }
  if (typeof PerformanceObserver === "undefined") return;
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          trackPerformanceMetric("fcp", entry.startTime);
          observer.disconnect();
          break;
        }
      }
    });
    observer.observe({ type: "paint", buffered: true });
  } catch { /* Unsupported performance observer type. */ }
  let lcp = -1;
  let cls = 0;
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) lcp = entry.startTime;
    });
    observer.observe({ type: "largest-contentful-paint", buffered: true });
  } catch { /* Unsupported observer type. */ }
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!shift.hadRecentInput && typeof shift.value === "number" && Number.isFinite(shift.value)) cls += shift.value;
      }
    });
    observer.observe({ type: "layout-shift", buffered: true });
  } catch { /* Unsupported observer type. */ }
  window.addEventListener("pagehide", () => {
    if (lcp >= 0) trackPerformanceMetric("lcp", lcp);
    trackPerformanceMetric("cls", cls);
  }, { once: true });
}

function capturePageView() {
  if (!TRACKING_OPTIONS.pageViews) return;
  const routeId = currentRouteId();
  if (routeId === lastPageRoute) return;
  lastPageRoute = routeId;
  capture("page_viewed", { route_id: routeId });
}

function isRecord(value: unknown): value is EventProperties {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function safeEvent(event: PosthogEvent | null | undefined): PosthogEvent | null {
  if (!event || typeof event.event !== "string") return null;
  const properties = isRecord(event.properties) ? event.properties : {};
  let safeProperties: EventProperties;
  switch (event.event) {
    case "product_opened":
      safeProperties = { app_name: appName };
      break;
    case "page_viewed":
      safeProperties = { app_name: appName, route_id: currentRouteId() };
      break;
    case "ui_interaction": {
      const type = properties.control_type;
      const controlType = typeof type === "string" && ["button", "link", "tab", "menuitem"].includes(type)
        ? type
        : "other";
      const action = properties.action_id;
      const actionId = typeof action === "string" && ACTION_IDS.has(action) ? action : "other";
      safeProperties = { app_name: appName, route_id: currentRouteId(), control_type: controlType, action_id: actionId };
      break;
    }
    case "feature_used": {
      const featureId = properties.feature_id;
      const outcome = properties.outcome;
      if (typeof featureId !== "string" || typeof outcome !== "string" ||
          !ACTION_IDS.has(featureId) || !OUTCOMES.has(outcome)) return null;
      safeProperties = { app_name: appName, route_id: currentRouteId(), feature_id: featureId, outcome };
      break;
    }
    case "workflow_step": {
      if (typeof properties.step_id !== "string" || typeof properties.outcome !== "string" || !WORKFLOW_STEPS.has(properties.step_id) || !WORKFLOW_RESULTS.has(properties.outcome)) return null;
      safeProperties = { app_name: appName, route_id: currentRouteId(), step_id: properties.step_id, outcome: properties.outcome };
      break;
    }
    case "client_issue": {
      if (typeof properties.issue_kind !== "string" || !ISSUE_KINDS.has(properties.issue_kind)) return null;
      safeProperties = { app_name: appName, route_id: currentRouteId(), issue_kind: properties.issue_kind };
      break;
    }
    case "workflow_timing": {
      const allowedBands = ["under_100ms", "100_499ms", "500_1999ms", "2_9s", "10s_plus"];
      if (typeof properties.step_id !== "string" || typeof properties.duration_band !== "string" || !WORKFLOW_STEPS.has(properties.step_id) || !allowedBands.includes(properties.duration_band)) return null;
      safeProperties = { app_name: appName, route_id: currentRouteId(), step_id: properties.step_id, duration_band: properties.duration_band };
      break;
    }
    case "client_performance": {
      if (typeof properties.metric_id !== "string" || typeof properties.metric_band !== "string" || !PERF_METRICS.has(properties.metric_id) || !PERF_BANDS.has(properties.metric_band)) return null;
      safeProperties = { app_name: appName, route_id: currentRouteId(), metric_id: properties.metric_id, metric_band: properties.metric_band };
      break;
    }
    case "$feature_flag_called": {
      const flag = properties.$feature_flag;
      if (typeof flag !== "string" || !/^[a-zA-Z0-9_.:-]{1,64}$/.test(flag)) return null;
      const rawResponse = properties.$feature_flag_response;
      const flagResponse = typeof rawResponse === "boolean"
        ? String(rawResponse)
        : typeof rawResponse === "string" && /^[a-zA-Z0-9_.:-]{1,40}$/.test(rawResponse)
          ? rawResponse
          : "other";
      safeProperties = { app_name: appName, $feature_flag: flag, $feature_flag_response: flagResponse };
      break;
    }
    case "$autocapture": {
      if (!TRACKING_OPTIONS.autocapture) return null;
      const elements = properties.$elements;
      const firstElement = Array.isArray(elements) && isRecord(elements[0]) ? elements[0] : {};
      const tag = firstElement.tag_name;
      const controlType = typeof tag === "string" && ["button", "a", "input"].includes(tag) ? tag : "other";
      safeProperties = { app_name: appName, route_id: currentRouteId(), control_type: controlType };
      break;
    }
    case "$exception":
      if (!TRACKING_OPTIONS.exceptionCapture) return null;
      safeProperties = { app_name: appName, error_category: "client_exception" };
      break;
    default:
      return null;
  }
  event.properties = { token: projectToken, distinct_id: properties.distinct_id, ...safeProperties };
  const allowedEnvelopeFields = new Set(["event", "properties", "uuid", "timestamp", "distinct_id", "type", "sent_at"]);
  for (const key of Object.keys(event)) {
    if (!allowedEnvelopeFields.has(key)) delete event[key];
  }
  return event;
}

function installInteractionTracking(instance: PosthogClient) {
  if (interactionTrackingInstalled || !TRACKING_OPTIONS.interactions) return;
  interactionTrackingInstalled = true;
  document.addEventListener("click", function (event) {
    const source = event.target;
    const target = source instanceof Element
      ? source.closest('button, a[href], [role="button"], [role="tab"], [role="menuitem"]')
      : null;
    if (!target) return;
    const role = target.getAttribute("role");
    const controlType = role === "tab" ? "tab" : role === "menuitem" ? "menuitem" :
      target.tagName.toLowerCase() === "a" ? "link" :
      target.tagName.toLowerCase() === "button" || role === "button" ? "button" : "other";
    const requestedAction = target.getAttribute("data-posthog-action") || "";
    const accessibleLabel = (target.getAttribute("aria-label") || target.getAttribute("title") || "").trim().toLocaleLowerCase();
    const actionId = ACTION_IDS.has(requestedAction)
      ? requestedAction
      : ACTION_LABELS.get(accessibleLabel) || "other";
    instance.capture("ui_interaction", { control_type: controlType, action_id: actionId });
  }, true);
}

function posthogOptions(): PosthogOptions {
  return {
    api_host: apiHost,
    defaults: "2026-05-30",
    autocapture: TRACKING_OPTIONS.autocapture,
    capture_pageview: false,
    capture_pageleave: false,
    capture_dead_clicks: false,
    capture_exceptions: TRACKING_OPTIONS.exceptionCapture,
    disable_session_recording: !TRACKING_OPTIONS.sessionReplay,
    disable_surveys: !TRACKING_OPTIONS.surveys,
    disable_surveys_automatic_display: true,
    advanced_disable_flags: !TRACKING_OPTIONS.featureFlags,
    disable_compression: true,
    person_profiles: "never",
    persistence: "sessionStorage",
    logs: { captureConsoleLogs: false },
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: "*",
      maskAllElementAttributes: true,
      blockSelector: ".ph-no-capture,[data-posthog-block]",
      streamNetworkBody: false
    },
    before_send: safeEvent,
    loaded: function (instance) {
      const instanceProperties = instance as unknown as Record<string, unknown>;
      for (const method of ["identify", "setPersonProperties", "group"]) {
        if (typeof instanceProperties[method] === "function") instanceProperties[method] = () => {};
      }
      instance.capture("product_opened", { app_name: appName });
      installInteractionTracking(instance);
      installIssueTracking();
      installPerformanceTracking();
      capturePageView();
      window.addEventListener("popstate", capturePageView);
    }
  };
}

function getPosthogStub(): PosthogClient {
  const posthog: PosthogClient = window.posthog || Object.assign([], {
    capture: () => {},
    init: () => {}
  }) as PosthogClient;
  if (posthog.__SV) return posthog;
  window.posthog = posthog;
  posthog._i = [];
  posthog.init = function (token, options, alias) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.crossOrigin = "anonymous";
    script.referrerPolicy = "no-referrer";
    script.async = true;
    script.src = apiHost.replace(/\/+$/, "") + "/static/array.js";
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) firstScript.parentNode.insertBefore(script, firstScript);
    else document.head.appendChild(script);
    const instanceName = alias || "posthog";
    const namedInstances = posthog as unknown as Record<string, unknown>;
    const instance: PosthogClient = instanceName === "posthog"
      ? posthog
      : (namedInstances[instanceName] as PosthogClient | undefined) || Object.assign([], {
        capture: () => {},
        init: () => {}
      }) as PosthogClient;
    if (instanceName !== "posthog") namedInstances[instanceName] = instance;
    const people: PosthogQueue = instance.people || [];
    instance.people = people;
    const instanceToString = function (verbose: boolean | number) {
      const name = instanceName === "posthog" ? "posthog" : "posthog." + instanceName;
      return verbose ? name : name + " (stub)";
    };
    Object.defineProperty(instance, "toString", {
      configurable: true, enumerable: true, writable: true, value: instanceToString
    });
    Object.defineProperty(people, "toString", {
      configurable: true, enumerable: true, writable: true,
      value: function () { return instanceToString(1) + ".people (stub)"; }
    });
    const methods = "init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" ");
    const instanceProperties = instance as unknown as Record<string, unknown>;
    for (const method of methods) {
      instanceProperties[method] = (...args: unknown[]) => instance.push([method, ...args]);
    }
    for (const method of ["identify", "setPersonProperties", "group"]) {
      instanceProperties[method] = () => {};
    }
    posthog._i?.push([token, options, instanceName]);
  };
  posthog.__SV = 1;
  return posthog;
}

window.__APP_ANALYTICS__ = Object.freeze({ trackFeature, trackWorkflow, trackIssue, trackTiming, trackPerformanceMetric, trackPageView: capturePageView });

if (productionBuild && TRACKING_OPTIONS.analytics && projectToken) {
  getPosthogStub().init(projectToken, posthogOptions());
}
