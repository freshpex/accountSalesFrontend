export default function SecondaryFooter() {
  return (
    <footer aria-label="secondary-footer" className="bg-neutral-100">
      <div className="container tablet:px-10 laptop:px-20 | text-center">
        <div className="border-t border-solid border-neutral-400 py-6">
          <div className="flex flex-col tablet:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500">
              Copyright © 2025 ScottTech | All Rights Reserved
            </p>
            <div className="flex gap-6 text-neutral-500">
              <a href="/terms" className="hover:text-primary transition-colors">
                Terms
              </a>
              <a
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
