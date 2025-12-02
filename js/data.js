const skillsData = [
  // Basic
  {
    id: 1, name: "Smart Google Search", cat: "Basic Competency", icon: "fa-search", week: 1,
    desc: "Move beyond simple keywords. Master operators like 'site:', 'filetype:pdf', and 'related:' to find exact academic results.",
    resource: "Google Advanced Search Guide", link: "https://support.google.com/websearch/answer/2466433"
  },

  {
    id: 2, name: "Fast Reading & Highlighting", cat: "Basic Competency", icon: "fa-book-open", week: 2,
    desc: "Learn the SQ3R method (Survey, Question, Read, Recite, Review) to scan papers effectively without reading every word.",
    resource: "Cornell University - SQ3R Method", link: "https://lsc.cornell.edu/how-to-study/reading-textbooks/"
  },

  {
    id: 3, name: "Google Scholar Basics", cat: "Basic Competency", icon: "fa-graduation-cap", week: 3,
    desc: "Set up 'Alerts' for new papers and use the 'Cite' button to grab formatted citations instantly.",
    resource: "Google Scholar Help", link: "https://scholar.google.com/intl/en/scholar/help.html"
  },

  {
    id: 4, name: "Zotero / Mendeley", cat: "Basic Competency", icon: "fa-quote-right", week: 4,
    desc: "Reference management software that stores PDFs and automatically creates bibliographies in Word.",
    resource: "Zotero Documentation", link: "https://www.zotero.org/support/"
  },

  {
    id: 5, name: "Note-taking & NotebookLM", cat: "Basic Competency", icon: "fa-sticky-note", week: 5,
    desc: "Upload PDFs to Google NotebookLM to get AI-generated audio overviews and Q&A based only on your sources.",
    resource: "Google NotebookLM", link: "https://notebooklm.google.com/"
  },

  {
    id: 6, name: "Basic English for Academic", cat: "Basic Competency", icon: "fa-pen-nib", week: 6,
    desc: "Adopt a formal, objective academic tone. Avoid slang and use the right phraseology.",
    resource: "Manchester Academic Phrasebank", link: "https://www.phrasebank.manchester.ac.uk/"
  },

  {
    id: 7, name: "AI Writing Assistant", cat: "Basic Competency", icon: "fa-robot", week: 7,
    desc: "Use AI to critique logic and outline structure, not to write for you. Learn prompt engineering.",
    resource: "One Useful Thing (AI Blog)", link: "https://www.oneusefulthing.org/"
  },

  {
    id: 8, name: "Research Topic Finding", cat: "Basic Competency", icon: "fa-lightbulb", week: 8,
    desc: "Identify unsolved problems. Visualize how papers connect to find a niche.",
    resource: "ConnectedPapers.com", link: "https://www.connectedpapers.com/"
  },

  {
    id: 9, name: "Plagiarism–Paraphrasing", cat: "Basic Competency", icon: "fa-check-double", week: 9,
    desc: "Reword ideas entirely in your own voice while crediting the original author.",
    resource: "Purdue OWL - Paraphrasing", link: "https://owl.purdue.edu/owl/research_and_citation/using_research/quoting_paraphrasing_and_summarizing/paraphrasing.html"
  },

  {
    id: 10, name: "Presentation Design", cat: "Basic Competency", icon: "fa-presentation", week: 10,
    desc: "Create clean slides. One idea per slide, minimal text, high-quality visuals.",
    resource: "Canva Design School", link: "https://www.canva.com/designschool/"
  },

  // Data & Survey
  {
    id: 11, name: "Google Forms Survey", cat: "Data & Survey", icon: "fa-poll", week: 11,
    desc: "Design logic-based surveys using 'Section based answers' to guide respondents.",
    resource: "Google Forms Help", link: "https://support.google.com/docs/answer/141062"
  },

  {
    id: 12, name: "Google Sheets Beginner", cat: "Data & Survey", icon: "fa-table", week: 12,
    desc: "Master freezing rows, sorting data, and using basic formulas like VLOOKUP and Pivot Tables.",
    resource: "Ben Collins - Sheets Tips", link: "https://www.benlcollins.com/"
  },

  {
    id: 13, name: "Data Cleaning Basics", cat: "Data & Survey", icon: "fa-broom", week: 13,
    desc: "Fix bad data: remove duplicates, handle null values, and standardize entry formats.",
    resource: "Data Cleaning Guide (Tableau)", link: "https://www.tableau.com/learn/articles/what-is-data-cleaning"
  },

  {
    id: 14, name: "Simple Data Visualization", cat: "Data & Survey", icon: "fa-chart-bar", week: 14,
    desc: "Choose the right chart. Bar for comparisons, Line for trends, Scatter for correlation.",
    resource: "Storytelling with Data", link: "https://www.storytellingwithdata.com/"
  },

  {
    id: 15, name: "Sampling Basics", cat: "Data & Survey", icon: "fa-users", week: 15,
    desc: "Understand random vs. convenience sampling to know your data's limitations.",
    resource: "Scribbr - Sampling Methods", link: "https://www.scribbr.com/methodology/sampling-methods/"
  },

  {
    id: 16, name: "AI-Assisted Analysis", cat: "Data & Survey", icon: "fa-microchip", week: 16,
    desc: "Upload CSV data to AI tools to identify top trends and outliers instantly.",
    resource: "Julius AI (Data Analysis)", link: "https://julius.ai/"
  },

  {
    id: 17, name: "SPSS Descriptive Stats", cat: "Data & Survey", icon: "fa-calculator", week: 17,
    desc: "Calculate Mean, Median, Mode, and Standard Deviation using SPSS software.",
    resource: "Laerd Statistics - SPSS", link: "https://statistics.laerd.com/"
  },

  {
    id: 18, name: "Mini Statistics Toolkit", cat: "Data & Survey", icon: "fa-tools", week: 18,
    desc: "Grasp core concepts: Variable types, Population vs. Sample, and Outliers.",
    resource: "Khan Academy - Statistics", link: "https://www.khanacademy.org/math/statistics-probability"
  },

  {
    id: 19, name: "Chart Interpretation", cat: "Data & Survey", icon: "fa-chart-line", week: 19,
    desc: "Understand what charts imply, not just what they show. Spot misleading axes.",
    resource: "Calling Bullshit (U Washington)", link: "https://callingbullshit.org/tools.html"
  },

  {
    id: 20, name: "Clean Table Making", cat: "Data & Survey", icon: "fa-border-all", week: 20,
    desc: "Format tables for papers: No vertical lines, only horizontal lines (APA Style).",
    resource: "APA Style - Table Setup", link: "https://apastyle.apa.org/style-grammar-guidelines/tables-figures/tables"
  },

  // Writing
  {
    id: 21, name: "Paragraph Writing Formula", cat: "Writing", icon: "fa-paragraph", week: 21,
    desc: "Use the TEEL structure: Topic sentence, Explanation, Evidence, Link to next idea.",
    resource: "TEEL Structure Guide", link: "https://www.studysmarter.co.uk/explanations/english/essay-writing/teel-structure/"
  },

  {
    id: 22, name: "Finding Literature Gaps", cat: "Writing", icon: "fa-binoculars", week: 22,
    desc: "Read the 'Future Research' section of papers to find what hasn't been done yet.",
    resource: "GradCoach - Research Gaps", link: "https://gradcoach.com/research-gap/"
  },

  {
    id: 23, name: "AI Literature Review", cat: "Writing", icon: "fa-book-reader", week: 23,
    desc: "Use tools like Elicit or SciSpace to find papers that answer specific questions.",
    resource: "Elicit.org", link: "https://elicit.org/"
  },

  {
    id: 24, name: "Research Proposal Structure", cat: "Writing", icon: "fa-file-alt", week: 24,
    desc: "Blueprint your project: Title -> Problem -> Objectives -> Methodology.",
    resource: "Scribbr - Research Proposal", link: "https://www.scribbr.com/research-process/research-proposal/"
  },

  {
    id: 25, name: "IMRaD Writing", cat: "Writing", icon: "fa-layer-group", week: 25,
    desc: "Standard scientific format: Introduction, Methods, Results, and Discussion.",
    resource: "Elsevier - IMRaD Guide", link: "https://scientific-publishing.webshop.elsevier.com/manuscript-preparation/what-is-imrad-format/"
  },

  {
    id: 26, name: "Abstract Writing", cat: "Writing", icon: "fa-compress-alt", week: 26,
    desc: "Write a 200-word summary of your entire paper. Write this last.",
    resource: "Nature - Writing Abstracts", link: "https://www.nature.com/documents/nature-summary-paragraph.pdf"
  },

  {
    id: 27, name: "Critical Thinking Basics", cat: "Writing", icon: "fa-brain", week: 27,
    desc: "Evaluate sources for bias, sample size issues, and methodological flaws.",
    resource: "Critical Thinking Web", link: "https://philosophy.hku.hk/think/"
  },

  {
    id: 28, name: "Fast Summarizing", cat: "Writing", icon: "fa-bolt", week: 28,
    desc: "The 1-3-25 rule: 1 sentence, 3 minutes, 25 words to capture the main point.",
    resource: "Scholarcy (AI Summarizer)", link: "https://www.scholarcy.com/"
  },

  {
    id: 29, name: "Citation and Referencing", cat: "Writing", icon: "fa-list-ol", week: 29,
    desc: "Understand in-text citations vs. reference lists. Stick to one style (APA/IEEE).",
    resource: "Purdue OWL - APA Style", link: "https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_style_introduction.html"
  },

  {
    id: 30, name: "Visual Abstract Making", cat: "Writing", icon: "fa-image", week: 30,
    desc: "Create a graphical summary of your paper, increasingly required by journals.",
    resource: "BioRender", link: "https://biorender.com/"
  },

  // Quantitative
  {
    id: 31, name: "Correlation Basics", cat: "Quantitative", icon: "fa-project-diagram", week: 31,
    desc: "Measure if things move together. Pearson correlation (r) ranges from -1 to +1.",
    resource: "StatQuest - Correlation", link: "https://www.youtube.com/watch?v=xZ_z8KWkhXE"
  },

  {
    id: 32, name: "Regression Basics", cat: "Quantitative", icon: "fa-chart-area", week: 32,
    desc: "Prediction logic: If X increases by 1, how much does Y increase?",
    resource: "StatQuest - Linear Regression", link: "https://www.youtube.com/watch?v=nk2CQITm_eo"
  },

  {
    id: 33, name: "Reliability Testing", cat: "Quantitative", icon: "fa-check-circle", week: 33,
    desc: "Check if survey questions are consistent using Cronbach’s Alpha.",
    resource: "Laerd - Cronbach's Alpha", link: "https://statistics.laerd.com/spss-tutorials/cronbachs-alpha-using-spss-statistics.php"
  },

  {
    id: 34, name: "Validity Concepts", cat: "Quantitative", icon: "fa-bullseye", week: 34,
    desc: "Are you measuring what you think you are measuring? (Construct vs Content validity).",
    resource: "Scribbr - Validity", link: "https://www.scribbr.com/methodology/types-of-validity/"
  },

  {
    id: 35, name: "Factor Analysis Basics", cat: "Quantitative", icon: "fa-filter", week: 35,
    desc: "Reduce many variables into a few 'factors' (e.g., 20 questions -> 3 personality traits).",
    resource: "UCLA IDRE - Factor Analysis", link: "https://stats.oarc.ucla.edu/spss/output/factor-analysis/"
  },

  {
    id: 36, name: "Data Storytelling", cat: "Quantitative", icon: "fa-comment-dots", week: 36,
    desc: "Explain the 'So What?' of your numbers. Don't just list stats, explain the insight.",
    resource: "Brent Dykes - Data Storytelling", link: "https://www.effectivedatastorytelling.com/"
  },

  {
    id: 37, name: "Output Interpretation", cat: "Quantitative", icon: "fa-eye", week: 37,
    desc: "Read confusing SPSS/Python output. Understand p-value < 0.05 (Significance).",
    resource: "Statistics Solutions - Interpretation", link: "https://www.statisticssolutions.com/"
  },

  {
    id: 38, name: "Quantitative Reporting", cat: "Quantitative", icon: "fa-file-invoice", week: 38,
    desc: "Write the Results section. 'There was a significant positive correlation (r=.56, p<.01).'",
    resource: "APA Reporting Stats", link: "https://apastyle.apa.org/instructional-aids/numbers-statistics-guide.pdf"
  },

  // Qualitative
  {
    id: 39, name: "Interview & FGD Tech", cat: "Qualitative", icon: "fa-microphone", week: 39,
    desc: "Conduct Focus Groups. Ask open-ended questions, avoid 'Yes/No' traps.",
    resource: "The Mom Test (Book)", link: "http://momtestbook.com/"
  },

  {
    id: 40, name: "Thematic Analysis (Manual)", cat: "Qualitative", icon: "fa-highlighter", week: 40,
    desc: "Read transcripts and highlight recurring themes. The classic manual method.",
    resource: "Braun & Clarke Framework", link: "https://www.psych.auckland.ac.nz/en/about/thematic-analysis.html"
  },

  {
    id: 41, name: "Thematic Analysis (AI)", cat: "Qualitative", icon: "fa-magic", week: 41,
    desc: "Use AI tools to spot patterns in 50+ pages of text instantly.",
    resource: "Taguette (Free Tool)", link: "https://www.taguette.org/"
  },

  {
    id: 42, name: "Coding Qualitative Data", cat: "Qualitative", icon: "fa-tags", week: 42,
    desc: "Assign labels to text snippets (e.g., labeling a sentence 'Customer Complaint').",
    resource: "Delve - Coding Guide", link: "https://delvetool.com/guide"
  },

  {
    id: 43, name: "Case Study Basics", cat: "Qualitative", icon: "fa-folder-open", week: 43,
    desc: "Deeply analyze one single event, company, or person to understand complex issues.",
    resource: "Robert Yin - Case Study Research", link: "https://us.sagepub.com/en-us/nam/case-study-research-and-applications/book250150"
  },

  {
    id: 44, name: "Writing Qual Findings", cat: "Qualitative", icon: "fa-pen-fancy", week: 44,
    desc: "Weave quotes into your writing. 'Participant A stated...' followed by analysis.",
    resource: "Scribbr - Qualitative Data", link: "https://www.scribbr.com/methodology/qualitative-research/"
  },

  {
    id: 45, name: "Mixed Methods Basics", cat: "Qualitative", icon: "fa-vial", week: 45,
    desc: "Use BOTH numbers (Quant) and interviews (Qual) to get the full picture.",
    resource: "John Creswell - Mixed Methods", link: "https://us.sagepub.com/en-us/nam/designing-and-conducting-mixed-methods-research/book241842"
  },

  {
    id: 46, name: "Connecting Quant + Qual", cat: "Qualitative", icon: "fa-link", week: 46,
    desc: "Explanatory Sequential Design: Survey first, then interview to explain WHY.",
    resource: "NIH - Mixed Methods Guide", link: "https://obssr.od.nih.gov/training/mixed-methods-research"
  },

  // Career
  {
    id: 47, name: "Academic Publishing", cat: "Career", icon: "fa-newspaper", week: 47,
    desc: "Understand the pipeline: Submit -> Editor Check -> Peer Review -> Revision.",
    resource: "Elsevier Researcher Academy", link: "https://researcheracademy.elsevier.com/"
  },

  {
    id: 48, name: "Journal Selection", cat: "Career", icon: "fa-map-signs", week: 48,
    desc: "Find non-predatory journals. Check Impact Factor and Scopus indexing.",
    resource: "SCImago Journal Rank", link: "https://www.scimagojr.com/"
  },

  {
    id: 49, name: "Responding to Reviewers", cat: "Career", icon: "fa-reply-all", week: 49,
    desc: "Write a 'Rebuttal Letter' when reviewers criticize your work. Be polite.",
    resource: "PLOS - Rebuttal Guide", link: "https://plos.org/resource/how-to-write-a-response-to-reviewers/"
  },

  {
    id: 50, name: "Scholar + ORCID Setup", cat: "Career", icon: "fa-id-card", week: 50,
    desc: "Create a permanent digital ID so your work is always attributed to you.",
    resource: "ORCID.org", link: "https://orcid.org/"
  },

  {
    id: 51, name: "Conference Presentation", cat: "Career", icon: "fa-chalkboard-teacher", week: 51,
    desc: "Present in 10-15 minutes. Focus on visuals, not reading text off the screen.",
    resource: "TED - Presentation Tips", link: "https://blog.ted.com/10-tips-for-better-slide-decks/"
  },

  {
    id: 52, name: "Project Management", cat: "Career", icon: "fa-tasks", week: 52,
    desc: "Manage deadlines, co-authors, and data versions effectively.",
    resource: "Trello for Research", link: "https://trello.com/templates/education/research-project-management"
  }
];
