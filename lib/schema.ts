import { z } from "zod";

/**
 * Generic helpers
 */
export const zId = z.string().min(1, "id is required");
export type Id = z.infer<typeof zId>;

export const zNonEmpty = z.string().min(1, "Required");

export const zEmail = z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address");

export const zColorHex = z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, "Invalid color hex");
export type ColorHex = z.infer<typeof zColorHex>;

/**
 * URLs and paths
 * - Allow on-site roots (/path) and absolute http(s) links.
 */
export const zHref = z
    .string()
    .trim()
    .refine(
        (v) =>
            v.startsWith("/") ||
            v.startsWith("http://") ||
            v.startsWith("https://") ||
            v.startsWith("mailto:") ||
            v.startsWith("tel:"),
        "Must be a path or a valid URL (/, http(s), mailto, tel)"
    );
export type Href = z.infer<typeof zHref>;

/**
 * Video paths for hero and showcases
 * Accepts on-site assets and absolute URLs
 */
export const zVideoPath = z
    .string()
    .trim()
    .refine(
        (v) =>
            v.startsWith("/videos/") ||
            v.startsWith("http://") ||
            v.startsWith("https://"),
        "Video should be served from /videos or a full URL"
    )
    .refine((v) => v.endsWith(".mp4") || v.endsWith(".webm"), "Video must be .mp4 or .webm");
export type VideoPath = z.infer<typeof zVideoPath>;

/**
 * Section anchors
 */
export const SectionIdEnum = z.enum([
    "hero",
    "features",
    "echo",
    "playbook",
    "metrics",
    "how-it-works",
    "cta",
    "faq",
    "footer",
]);
export type SectionId = z.infer<typeof SectionIdEnum>;

export const zAnchorHref = z.custom<`/#${SectionId}`>((val) => {
    if (typeof val !== "string") return false;
    if (!val.startsWith("/#")) return false;
    const id = val.slice(2) as SectionId;
    return SectionIdEnum.safeParse(id).success;
}, "Anchor href must match '/#section-id'");
export type AnchorHref = z.infer<typeof zAnchorHref>;

/**
 * CTA
 */
export const CtaStyleEnum = z.enum(["primary", "secondary", "link"]);
export type CtaStyle = z.infer<typeof CtaStyleEnum>;

export const zCTA = z.object({
    label: zNonEmpty.max(40),
    href: z.union([zHref, zAnchorHref]),
    style: CtaStyleEnum.default("primary"),
    /**
     * Optional icon name (lucide icon identifier) used by UI layer
     */
    icon: z.string().optional(),
    newTab: z.boolean().default(false),
    /**
     * Accessible description for screen readers
     */
    srLabel: z.string().optional(),
});
export type CTA = z.infer<typeof zCTA>;

/**
 * Media
 */
export const zVideoSource = z.object({
    src: zVideoPath,
    type: z.enum(["mp4", "webm"]).default("mp4"),
    poster: z
        .string()
        .trim()
        .optional(),
});
export type VideoSource = z.infer<typeof zVideoSource>;

/**
 * Hero content
 */
export const zHero = z.object({
    id: SectionIdEnum.default("hero"),
    headline: zNonEmpty.max(120),
    subheadline: zNonEmpty.max(240),
    primaryCta: zCTA,
    secondaryCta: zCTA.optional(),
    video: zVideoSource,
    /**
     * Visual options for overlays and theme
     */
    overlay: z
        .object({
            enabled: z.boolean().default(true),
            /**
             * Backdrop gradient opacity 0-1
             */
            gradientOpacity: z.number().min(0).max(1).default(0.35),
            blurPx: z.number().min(0).max(20).default(6),
        })
        .default({}),
    motif: z
        .object({
            /**
             * "square-with-circle" to reflect brand motif in hero container
             */
            type: z.enum(["square-with-circle"]).default("square-with-circle"),
            borderColor: zColorHex.optional(),
            borderOpacity: z.number().min(0).max(1).default(0.2),
            radius: z.number().min(0).max(24).default(8),
        })
        .default({}),
});
export type Hero = z.infer<typeof zHero>;

/**
 * Features Overview
 */
export const zFeature = z.object({
    id: zId.optional(),
    title: zNonEmpty.max(80),
    description: zNonEmpty.max(280),
    /**
     * Icon identifier (lucide icon name) - presentation-only
     */
    icon: z.string().optional(),
    /**
     * One supporting benefit tagline
     */
    benefit: z.string().max(140).optional(),
});
export type Feature = z.infer<typeof zFeature>;

export const zFeaturesSection = z.object({
    id: SectionIdEnum.default("features"),
    items: z.array(zFeature).min(1).max(6),
});
export type FeaturesSection = z.infer<typeof zFeaturesSection>;

/**
 * Echo (AI Assistant) specifics
 */
export const zEchoUseCase = z.object({
    prompt: zNonEmpty.max(160),
    /**
     * Optional short explanation of how Echo responds or why it matters
     */
    note: z.string().max(160).optional(),
});
export type EchoUseCase = z.infer<typeof zEchoUseCase>;

export const zEchoSection = z.object({
    id: SectionIdEnum.default("echo"),
    title: zNonEmpty.max(100).default("Echo (AI Assistant)"),
    description: zNonEmpty.max(320),
    useCases: z.array(zEchoUseCase).min(1).max(8),
});
export type EchoSection = z.infer<typeof zEchoSection>;

/**
 * Onboarding Playbook structure
 */
export const PlaybookHeadingEnum = z.enum([
    "Role Overview",
    "Core Responsibilities",
    "Daily/Weekly/Monthly Routines",
    "Key Systems and Access",
    "Processes and SOPs",
    "Stakeholders and Communication",
    "FAQs and Troubleshooting",
]);
export type PlaybookHeading = z.infer<typeof PlaybookHeadingEnum>;

export const zPlaybookEntry = z.object({
    heading: PlaybookHeadingEnum,
    /**
     * Markdown content for the entry
     */
    bodyMarkdown: zNonEmpty,
});
export type PlaybookEntry = z.infer<typeof zPlaybookEntry>;

export const zPlaybookSection = z.object({
    id: SectionIdEnum.default("playbook"),
    title: zNonEmpty.max(100).default("Onboarding Playbook"),
    description: zNonEmpty.max(320),
    outline: z.array(zPlaybookEntry).min(1),
});
export type PlaybookSection = z.infer<typeof zPlaybookSection>;

/**
 * Metrics & Impact
 */
export const EasingEnum = z.enum(["linear", "easeIn", "easeOut", "easeInOut"]);
export type Easing = z.infer<typeof EasingEnum>;

export const zMetric = z.object({
    id: zId.optional(),
    label: zNonEmpty.max(80),
    /**
     * Target numeric value to animate to
     */
    value: z.number().nonnegative(),
    /**
     * Unit label displayed near value (%, days, weeks, score)
     */
    unit: z.string().max(16).optional(),
    /**
     * Animation config
     */
    animate: z
        .object({
            durationMs: z.number().min(100).max(5000).default(1400),
            delayMs: z.number().min(0).max(2000).default(0),
            easing: EasingEnum.default("easeOut"),
        })
        .default({}),
});
export type Metric = z.infer<typeof zMetric>;

export const GraphBackgroundStyleEnum = z.enum(["glass-dark", "solid-dark"]);
export type GraphBackgroundStyle = z.infer<typeof GraphBackgroundStyleEnum>;

export const zMetricsSection = z.object({
    id: SectionIdEnum.default("metrics"),
    title: zNonEmpty.max(100).default("Metrics & Impact"),
    subtitle: z.string().max(200).optional(),
    metrics: z.array(zMetric).min(1).max(8),
    graphStyle: z
        .object({
            background: GraphBackgroundStyleEnum.default("glass-dark"),
            /**
             * Accent color used sparingly for highlights
             * Default brand: #752E4F
             */
            accent: zColorHex.default("#752E4F"),
            /**
             * Apply a thin border highlight around a primary chart
             */
            accentBorder: z.boolean().default(true),
        })
        .default({}),
});
export type MetricsSection = z.infer<typeof zMetricsSection>;

/**
 * How It Works (3 steps)
 */
export const zHowStep = z.object({
    step: z.number().int().min(1).max(9),
    title: zNonEmpty.max(80),
    description: zNonEmpty.max(200),
    icon: z.string().optional(),
});
export type HowStep = z.infer<typeof zHowStep>;

export const zHowItWorksSection = z.object({
    id: SectionIdEnum.default("how-it-works"),
    title: zNonEmpty.max(100).default("How It Works"),
    steps: z.array(zHowStep).min(3).max(6),
});
export type HowItWorksSection = z.infer<typeof zHowItWorksSection>;

/**
 * Call To Action section
 */
export const zCTASection = z.object({
    id: SectionIdEnum.default("cta"),
    title: zNonEmpty.max(120),
    primary: zCTA,
    secondary: zCTA.optional(),
    /**
     * Visual: emphasize brand color background for primary CTA
     */
    emphasizeBrand: z.boolean().default(true),
});
export type CTASection = z.infer<typeof zCTASection>;

/**
 * FAQ
 */
export const zFaqItem = z.object({
    q: zNonEmpty.max(140),
    a: zNonEmpty,
});
export type FaqItem = z.infer<typeof zFaqItem>;

export const zFaqSection = z.object({
    id: SectionIdEnum.default("faq"),
    items: z.array(zFaqItem).min(1),
});
export type FaqSection = z.infer<typeof zFaqSection>;

/**
 * Footer
 */
export const zFooterLink = z.object({
    label: zNonEmpty.max(48),
    href: zHref,
    external: z.boolean().default(false),
});
export type FooterLink = z.infer<typeof zFooterLink>;

export const zFooter = z.object({
    id: SectionIdEnum.default("footer"),
    links: z.array(zFooterLink).min(1),
    attribution: z.string().max(160).optional(),
});
export type Footer = z.infer<typeof zFooter>;

/**
 * Navigation
 */
export const zNavItem = z.object({
    label: zNonEmpty.max(32),
    href: z.union([zAnchorHref, zHref]),
});
export type NavItem = z.infer<typeof zNavItem>;

export const zNav = z.object({
    items: z.array(zNavItem).min(1),
});
export type Nav = z.infer<typeof zNav>;

/**
 * Site meta and config
 */
export const zSocialLink = z.object({
    network: z.enum(["x", "linkedin", "github", "website", "youtube", "facebook", "instagram"]),
    href: zHref,
});
export type SocialLink = z.infer<typeof zSocialLink>;

export const zSiteMeta = z.object({
    title: zNonEmpty.max(80).default("theMindArk.AI — Exit Strategy Echo"),
    description: zNonEmpty.max(200).default(
        "Capture what they know. Keep it working. Replicate departing employees as secure Echos and generate an onboarding playbook that lasts."
    ),
    ogImage: z.string().optional(),
});
export type SiteMeta = z.infer<typeof zSiteMeta>;

export const zSiteConfig = z.object({
    brandName: zNonEmpty.max(64).default("theMindArk.AI"),
    brandColor: zColorHex.default("#752E4F"),
    darkMode: z.boolean().default(true),
    nav: zNav,
    social: z.array(zSocialLink).default([]),
    meta: zSiteMeta.default({}),
});
export type SiteConfig = z.infer<typeof zSiteConfig>;

/**
 * Landing page composition
 * All sections included in a single-page layout.
 */
export const zLandingPage = z.object({
    route: z.literal("/").default("/"),
    hero: zHero,
    features: zFeaturesSection,
    echo: zEchoSection,
    playbook: zPlaybookSection,
    metrics: zMetricsSection,
    howItWorks: zHowItWorksSection,
    cta: zCTASection,
    faq: zFaqSection,
    footer: zFooter,
    config: zSiteConfig,
});
export type LandingPage = z.infer<typeof zLandingPage>;

/**
 * Forms
 */
export const zNewsletterForm = z.object({
    name: zNonEmpty.max(80),
    email: zEmail,
});
export type NewsletterForm = z.infer<typeof zNewsletterForm>;

export const zDemoRequestForm = z.object({
    name: zNonEmpty.max(80),
    email: zEmail,
    company: zNonEmpty.max(120),
    role: z.string().max(80).optional(),
    teamSize: z
        .number()
        .int()
        .min(1)
        .max(100000)
        .optional(),
    message: z.string().max(800).optional(),
    /**
     * Checkbox to accept privacy/terms if applicable
     */
    agreeToContact: z.boolean().default(true),
});
export type DemoRequestForm = z.infer<typeof zDemoRequestForm>;

/**
 * Utility: guards
 */
export const isAnchorHref = (value: unknown): value is AnchorHref =>
    zAnchorHref.safeParse(value).success;

export const isColorHex = (value: unknown): value is ColorHex =>
    zColorHex.safeParse(value).success;