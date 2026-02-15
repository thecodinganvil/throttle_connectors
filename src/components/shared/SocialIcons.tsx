export default function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 sm:gap-5 ${className}`}>
      <a
        href="https://www.instagram.com/throttleconnectors?igsh=c3N4NDc4aHZmYWlr"
        aria-label="Instagram"
        className="social-icon"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" />
        </svg>
      </a>
      <a
        href="https://www.linkedin.com/in/krishna-prajapati-a3aa5a315?utm_source=share_via&utm_content=profile&utm_medium=member_android"
        aria-label="LinkedIn"
        className="social-icon"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="18" rx="2" />
          <line x1="7" y1="8" x2="7" y2="17" />
          <line x1="11" y1="11" x2="11" y2="17" />
          <path d="M11 11a3 3 0 0 1 6 0v6" />
          <circle cx="7" cy="6" r="1" />
        </svg>
      </a>
      <a
        href="https://www.facebook.com/share/1FvF4bWYsy/"
        aria-label="Facebook"
        className="social-icon"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      </a>
    </div>
  );
}
