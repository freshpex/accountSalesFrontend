import { motion } from "framer-motion";

const cardTick = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
  >
    <path
      d="M20.25 13.875H3C2.385 13.875 1.875 13.365 1.875 12.75C1.875 12.135 2.385 11.625 3 11.625H20.25C20.865 11.625 21.375 12.135 21.375 12.75C21.375 13.365 20.865 13.875 20.25 13.875Z"
      fill="black"
    />
    <path
      d="M12 25.875H9C8.385 25.875 7.875 25.365 7.875 24.75C7.875 24.135 8.385 23.625 9 23.625H12C12.615 23.625 13.125 24.135 13.125 24.75C13.125 25.365 12.615 25.875 12 25.875Z"
      fill="black"
    />
    <path
      d="M21.75 25.875H15.75C15.135 25.875 14.625 25.365 14.625 24.75C14.625 24.135 15.135 23.625 15.75 23.625H21.75C22.365 23.625 22.875 24.135 22.875 24.75C22.875 25.365 22.365 25.875 21.75 25.875Z"
      fill="black"
    />
    <path
      d="M26.34 31.875H9.66C3.69 31.875 1.875 30.075 1.875 24.165V11.835C1.875 5.925 3.69 4.125 9.66 4.125H20.25C20.865 4.125 21.375 4.635 21.375 5.25C21.375 5.865 20.865 6.375 20.25 6.375H9.66C4.95 6.375 4.125 7.185 4.125 11.835V24.15C4.125 28.8 4.95 29.61 9.66 29.61H26.325C31.035 29.61 31.86 28.8 31.86 24.15V16.53C31.86 15.915 32.37 15.405 32.985 15.405C33.6 15.405 34.11 15.915 34.11 16.53V24.15C34.125 30.075 32.31 31.875 26.34 31.875Z"
      fill="black"
    />
    <path
      d="M26.9992 12.3756C26.7142 12.3756 26.4292 12.2706 26.2042 12.0456L23.9542 9.79564C23.5192 9.36064 23.5192 8.64064 23.9542 8.20564C24.3892 7.77064 25.1092 7.77064 25.5442 8.20564L26.9992 9.66064L32.2042 4.45564C32.6392 4.02064 33.3592 4.02064 33.7942 4.45564C34.2292 4.89064 34.2292 5.61064 33.7942 6.04564L27.7942 12.0456C27.5692 12.2706 27.2842 12.3756 26.9992 12.3756Z"
      fill="black"
    />
  </svg>
);

const chartSquare = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
  >
    <path
      d="M15.1655 27.2245H9.48047C8.86547 27.2245 8.35547 26.7145 8.35547 26.0995V18.4195C8.35547 16.8595 9.63045 15.5844 11.1905 15.5844H15.1655C15.7805 15.5844 16.2905 16.0944 16.2905 16.7094V26.0844C16.2905 26.7144 15.7805 27.2245 15.1655 27.2245ZM10.6055 24.9745H14.0404V17.8495H11.1905C10.8755 17.8495 10.6055 18.1044 10.6055 18.4344V24.9745Z"
      fill="#292D32"
    />
    <path
      d="M20.8344 27.2245H15.1494C14.5344 27.2245 14.0244 26.7145 14.0244 26.0995V11.6094C14.0244 10.0494 15.2994 8.77441 16.8594 8.77441H19.1394C20.6994 8.77441 21.9744 10.0494 21.9744 11.6094V26.0995C21.9594 26.7145 21.4644 27.2245 20.8344 27.2245ZM16.2894 24.9745H19.7244V11.6094C19.7244 11.2944 19.4694 11.0244 19.1394 11.0244H16.8594C16.5444 11.0244 16.2744 11.2794 16.2744 11.6094V24.9745H16.2894Z"
      fill="#292D32"
    />
    <path
      d="M26.5209 27.2246H20.8359C20.2209 27.2246 19.7109 26.7146 19.7109 26.0996V19.2744C19.7109 18.6594 20.2209 18.1494 20.8359 18.1494H24.8109C26.3709 18.1494 27.6459 19.4244 27.6459 20.9844V26.0996C27.6459 26.7146 27.1509 27.2246 26.5209 27.2246ZM21.9609 24.9746H25.3959V20.9844C25.3959 20.6694 25.1409 20.3994 24.8109 20.3994H21.9609V24.9746Z"
      fill="#292D32"
    />
    <path
      d="M22.5 34.125H13.5C5.355 34.125 1.875 30.645 1.875 22.5V13.5C1.875 5.355 5.355 1.875 13.5 1.875H22.5C30.645 1.875 34.125 5.355 34.125 13.5V22.5C34.125 30.645 30.645 34.125 22.5 34.125ZM13.5 4.125C6.585 4.125 4.125 6.585 4.125 13.5V22.5C4.125 29.415 6.585 31.875 13.5 31.875H22.5C29.415 31.875 31.875 29.415 31.875 22.5V13.5C31.875 6.585 29.415 4.125 22.5 4.125H13.5Z"
      fill="#292D32"
    />
  </svg>
);

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
      delay: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const childrenVariant = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};

export default function Banner() {
  return (
    <section aria-label="Banner section" className="bg-neutral-200">
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        className="container tablet:px-10 laptop:px-20 | py-20 laptop:py-28"
      >
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-14 max-tablet:max-w-sm max-tablet:mx-auto">
          <h2 className="text-800 text-neutral-900 font-bold font-['Integral_CF',_sans-serif] leading-tight tablet:max-laptop:col-span-2 tablet:max-laptop:max-w-lg max-tablet:text-center">
            Premium Social Media Accounts Marketplace
          </h2>

          {[
            {
              img: cardTick,
              title: "Secure Transfer",
              description:
                "Safe and secure account transfer process with verified sellers and escrow service.",
            },
            {
              img: chartSquare,
              title: "Verified Accounts",
              description:
                "All accounts are pre-verified with real followers and engagement metrics.",
            },
          ].map(({ img, title, description }, index) => (
            <motion.div
              variants={childrenVariant}
              key={index}
              className="flex gap-4"
            >
              <div>{img}</div>

              <div className="space-y-3">
                <h3 className="text-600 font-bold leading-tight">{title}</h3>
                <p className="text-neutral-600 leading-relaxed">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
