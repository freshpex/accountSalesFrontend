export default function SectionDivider({ sectionDividerExtraClasses, borderExtraClasses }) {
    return (
        <div
            aria-label="section divider by border"
            className={sectionDividerExtraClasses}
        >
            <div className={`border-solid border-neutral-400 | ${borderExtraClasses}`}></div>
        </div>
    );
}
