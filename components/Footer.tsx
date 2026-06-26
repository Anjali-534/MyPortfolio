import { profile } from "@/data"

export default function Footer() {
  return (
    <footer className="border-t border-[#2B1B2E]/[0.07] bg-[#FFF8F3]">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-gradient-to-br from-[#FF7E5F] to-[#9B5DE5]" />
          <span className="text-[#2B1B2E]/40 text-sm">
            {profile.name} · {new Date().getFullYear()}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7A5C6E]/40 hover:text-[#2B1B2E]/60 transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/anjali-aggarwal534"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7A5C6E]/40 hover:text-[#2B1B2E]/60 transition-colors text-sm"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-[#7A5C6E]/40 hover:text-[#FF7E5F]/80 transition-colors text-sm"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
