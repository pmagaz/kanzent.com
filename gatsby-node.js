exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  
  // This is where you would typically fetch data from a CMS or local files
  // For this example, I'm hardcoding the case studies data
  const caseStudies = [
    {
      id: "oneportfolio", // This ID is used for URL routing
      title: "OnePortfolio",
      subtitle: "Portfolio Management Solution",
      description: [
        "OnePortfolio is a portfolio platform solution that helps investors track and optimize their investments across multiple brokers, currencies and asset classes in a simplified view. It eliminates the complexity of monitoring multiple portfolios across different brokers, keeping all your investments in one place.",
        "Many of our team members are active investors themselves, and we developed this product after experiencing frustration with existing portfolio trackers that were either too basic or had prohibitive price points for the average retail investor."
      ],
      logo: "/images/case-studies/oneportfolio.png",
      screenshot: "/images/case-studies/oneportfolio-screenshoot.webp",
      backgroundImage: "/images/case-studies/case-study-bg.png",
      technologies: ["Rust", "React"],
      challenge: "Financial platforms of this nature must process data from multiple sources and perform complex computational tasks to calculate the metrics and KPIs investors need. Scalability and Timely data updates present significant obstacles. Perhaps the most demanding challenge is achieving optimal performance when handling the enormous volumes of financial data that must be processed while maintaining a seamless user experience.",
      solution: "If performance really matters, you have to carefully select the stack. A wrong selection may impact the experience of your users or have costly consequences: Nothing is free in the Cloud. For this reason, we selected Rust as our core language and implemented a complete asynchronous architecture. This approach allowed us to process massive datasets with exceptional efficiency and minimal memory usage, helping us to reduce infrastructure costs.",
      results: "Since launch, OnePortfolio has attracted thousands of users in a record time across both Web and Mobile channels. User reviews are quite positive and report saving an average of 3 hours per week on portfolio management tasks, and the platform has received recognition for its intuitive design and comprehensive feature set.",
      testimonial: {
        quote: "Keeping track of my international investments across different brokers was a mess. The dashboard organizes everything so clearly, I can finally see my entire financial picture at a glance.",
        author: "George S.",
        position: ""
      },
      ctaLink: "https://oneportfolio.io",
      ctaText: "Visit Website",
      url: "https://oneportfolio.io", // The website URL for display
      text: "Portfolio Management solution", // Description of what the case study is
      icon: "/images/oneportfolio.png", // Logo for displaying in the case studies carousel
      link: "/case-studies/oneportfolio" // Removed the .io extension from the link
    },
    // Add more case studies here following the same structure
  ];
  
  // Create a page for each case study
  caseStudies.forEach(caseStudy => {
    // Create a URL-safe path
    const pagePath = `case-studies/${caseStudy.id}`;
      
    createPage({
      path: pagePath,
      component: require.resolve('./src/pages/CaseStudyPage.js'),
      context: {
        caseStudy
      },
    });
  });
};