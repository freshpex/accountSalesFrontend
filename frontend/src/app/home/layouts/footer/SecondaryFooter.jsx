export default function SecondaryFooter() {
    return (
        <footer
            aria-label="secondary-footer"
            className="bg-neutral-100"
        >
            <div className="container tablet:px-10 laptop:px-20 | text-center">
                <div className="border-t border-solid border-neutral-400 py-6">
                    <p className="text-neutral-500">
                        Copyright © 2025 Social Accounts Marketplace | All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}
