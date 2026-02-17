import { IconCloud } from "./ui/icon-cloud";

const slugs = [
    "typescript",
    "javascript",
    "openjdk",
    "react",
    "html5",
    "css",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "androidstudio",
    "figma",
    "python",
    "mongodb",
    "redux",
    "tailwindcss",
];

export function SkillsCloud() {
    const images = slugs.map(
        (slug) => `https://cdn.simpleicons.org/${slug}`
    );

    return (
        <section className="py-20 bg-slate-50 border-t border-slate-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-10">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        Technologies You Will Master
                    </h3>
                    <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Go beyond the basics with a curriculum designed for modern engineering. Gain hands-on proficiency in the industry's most in-demand languages and frameworks, ensuring you possess the production-ready skills to build scalable, high-performance applications.
                    </p>
                </div>

                <div className="relative flex size-full max-w-2xl mx-auto items-center justify-center overflow-hidden bg-background rounded-lg">
                    <IconCloud images={images} />
                </div>
            </div>
        </section>
    );
}
