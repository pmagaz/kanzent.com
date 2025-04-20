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
        "OnePortfolio is a comprehensive portfolio management solution that helps investors track and optimize their investments across multiple asset classes.",
        "The platform integrates with various financial institutions to provide real-time data and insights, allowing users to make informed decisions about their investments."
      ],
      logo: "/images/case-studies/oneportfolio.png",
      screenshot: "/images/case-studies/oneportfolio-screenshoot.webp",
      backgroundImage: "/images/case-studies/case-study-bg.png",
      technologies: ["React", "Node.js", "MongoDB"],
      challenge: "The client needed a solution that could aggregate financial data from multiple sources while providing a user-friendly interface for investors to track and manage their portfolios. Security, scalability, and real-time updates were critical requirements.",
      solution: "We developed a secure, cloud-based platform with real-time data integration capabilities. The solution includes customizable dashboards, automated reporting features, and advanced analytics tools to help users optimize their investment strategies.",
      results: "Since launch, OnePortfolio has attracted over 10,000 users and manages more than $500 million in assets. Users report saving an average of 5 hours per week on portfolio management tasks, and the platform has received recognition for its intuitive design and comprehensive feature set.",
      testimonial: {
        quote: "Working with Kaizens transformed our vision into reality. The OnePortfolio platform exceeded our expectations in terms of functionality, user experience, and performance.",
        author: "Jane Smith",
        position: "CEO, OnePortfolio Inc."
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