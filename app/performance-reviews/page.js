"use client";

import React, { useState, useEffect, useMemo } from "react";
import { loadEmployeeData } from "@/lib/dataUtils";
import { 
  CheckCircle, 
  XCircle, 
  Calendar,
  Search,
  Filter,
  Save,
  AlertCircle,
  ChevronDown,
  FileText,
  User,
  Users,
  Buildings,
  Briefcase,
  PieChart,
  Download,
  ChevronLeft,
  Star,
  TrendingUp,
  Clock,
  Award,
  ChevronRight,
  ChevronUp,
  ChevronsUp,
  Smile,
  Frown,
  Meh,
  Plus,
  MoreVertical,
  BarChart2,
  Target,
  BookOpen,
  Check,
  X
} from "lucide-react";
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PerformanceReviewPage = () => {
  // State management
  const [employees, setEmployees] = useState([]);
  const [reviews, setReviews] = useState({});
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [reviewPeriod, setReviewPeriod] = useState("Q2 2023");
  const [sortOrder, setSortOrder] = useState({ field: "last_name", direction: "asc" });
  const [activeTab, setActiveTab] = useState("overview");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [expandedCriteria, setExpandedCriteria] = useState({});
  const [isPrinting, setIsPrinting] = useState(false);
  
  // List of realistic names for employees
  const firstNames = ["Michael", "Sarah", "David", "Emma", "John", "Olivia", "James", "Sophia", "Robert", "Ava", 
                      "William", "Isabella", "Daniel", "Mia", "Richard", "Charlotte", "Thomas", "Amelia", "Matthew", 
                      "Harper", "Alexandra", "Benjamin", "Natalie", "Christopher", "Elizabeth", "Andrew", "Grace", 
                      "Joshua", "Lily", "Ryan", "Victoria", "Brandon", "Sofia", "Jacob", "Chloe", "Kevin", "Luna", 
                      "Justin", "Zoe", "Brian", "Hannah", "Jason", "Stella", "Tyler", "Scarlett"];
                      
  const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
                    "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", 
                    "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "King", 
                    "Wright", "Scott", "Green", "Baker", "Adams", "Nelson", "Hill", "Ramirez", "Campbell", "Mitchell", 
                    "Roberts", "Carter", "Phillips", "Evans", "Turner", "Torres"];

  // Performance criteria and ratings
  const criteriaCategories = [
    { 
      id: "jobKnowledge", 
      name: "Job Knowledge",
      description: "Depth of understanding and technical expertise in their role"
    },
    { 
      id: "qualityOfWork", 
      name: "Quality of Work",
      description: "Accuracy, thoroughness, and excellence in deliverables"
    },
    { 
      id: "productivity", 
      name: "Productivity",
      description: "Efficiency and output volume relative to expectations"
    },
    { 
      id: "communication", 
      name: "Communication",
      description: "Effectiveness in verbal and written exchanges"
    },
    { 
      id: "teamwork", 
      name: "Teamwork",
      description: "Collaboration skills and contribution to group success"
    },
    { 
      id: "problemSolving", 
      name: "Problem Solving",
      description: "Ability to analyze issues and develop solutions"
    },
    { 
      id: "initiative", 
      name: "Initiative",
      description: "Proactive approach to responsibilities and improvements"
    }
  ];

  // Rating scale descriptions
  const ratingScale = [
    { value: 1, label: "Unsatisfactory", description: "Fails to meet basic requirements" },
    { value: 2, label: "Needs Improvement", description: "Occasionally meets requirements" },
    { value: 3, label: "Meets Expectations", description: "Consistently meets all requirements" },
    { value: 4, label: "Exceeds Expectations", description: "Regularly surpasses requirements" },
    { value: 5, label: "Outstanding", description: "Consistently exceeds at exceptional level" }
  ];

  useEffect(() => {
    async function fetchData() {
      // Load employee data
      const data = await loadEmployeeData();
      const processedData = Array.isArray(data) ? data : [];
      
      // Assign names to all employees
      const processedEmployees = processedData.map((emp, index) => {
        // Generate a unique realistic name for each employee regardless of original name
        const randomFirstNameIndex = index % firstNames.length;
        const randomLastNameIndex = (index * 3) % lastNames.length;
        
        const randomFirstName = firstNames[randomFirstNameIndex];
        const randomLastName = lastNames[randomLastNameIndex];
        
        return {
          ...emp,
          id: emp.id || `emp-${index}`,
          first_name: randomFirstName,
          last_name: randomLastName,
          position: emp.position || generateRandomPosition(emp.department || "General"),
          hire_date: emp.hire_date || generateRandomHireDate(),
          department: emp.department || generateRandomDepartment()
        };
      });
      
      setEmployees(processedEmployees);
      
      // Initialize reviews with enriched professional values
      const initialReviews = {};
      processedEmployees.forEach(emp => {
        initialReviews[emp.id] = {
          performance: generateInitialPerformance(),
          strengths: generateRandomStrengths(),
          areas_for_improvement: generateRandomAreasForImprovement(),
          comments: "",
          goals: generateRandomGoals(),
          absences: emp.absences || Math.floor(Math.random() * 8), 
          lastReview: emp.lastReview || new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 120).toLocaleDateString(),
          rating: (Math.floor(Math.random() * 25) + 75) / 10,
          criteria: generateRandomCriteriaRatings(),
          developmentPlan: generateRandomDevelopmentPlan(),
          reviewDate: new Date().toLocaleDateString(),
          reviewStatus: Math.random() > 0.3 ? "pending" : "completed",
          completedBy: Math.random() > 0.5 ? "Manager Name" : ""
        };
      });
      setReviews(initialReviews);
    }
    fetchData();
  }, []);

  // Generate random department if not provided
  const generateRandomDepartment = () => {
    const departments = [
      "Engineering", "Marketing", "Sales", "HR", 
      "Finance", "Product", "Customer Support", "Operations"
    ];
    return departments[Math.floor(Math.random() * departments.length)];
  };

  // Generate random hire date (between 1 and 10 years ago)
  const generateRandomHireDate = () => {
    const today = new Date();
    const years = Math.floor(Math.random() * 9) + 1;
    const pastDate = new Date(today);
    pastDate.setFullYear(today.getFullYear() - years);
    pastDate.setMonth(Math.floor(Math.random() * 12));
    pastDate.setDate(Math.floor(Math.random() * 28) + 1);
    return pastDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Generate random criteria ratings
  const generateRandomCriteriaRatings = () => {
    const ratings = {};
    criteriaCategories.forEach(category => {
      ratings[category.id] = Math.floor(Math.random() * 3) + 3;
    });
    return ratings;
  };

  // Generate random development plan
  const generateRandomDevelopmentPlan = () => {
    const developmentPlans = [
      "Participate in leadership training program to develop management skills",
      "Attend technical workshops to enhance expertise in current technologies",
      "Complete certification program in relevant technical field",
      "Participate in communication skills workshop to improve stakeholder interactions",
      "Mentor junior team members to develop leadership capabilities",
      "Cross-train with other departments to gain broader organizational knowledge",
      "Join professional associations to expand industry knowledge and networking",
      "Engage in regular feedback sessions with manager to track progress on goals"
    ];
    
    const count = Math.floor(Math.random() * 2) + 1;
    const selectedPlans = [];
    
    while (selectedPlans.length < count) {
      const randomIndex = Math.floor(Math.random() * developmentPlans.length);
      const plan = developmentPlans[randomIndex];
      if (!selectedPlans.includes(plan)) selectedPlans.push(plan);
    }
    
    return selectedPlans.join("; ");
  };

  // Generate random position titles based on department
  const generateRandomPosition = (department) => {
    const positions = {
      "Engineering": ["Software Engineer", "Frontend Developer", "Backend Developer", "DevOps Engineer", "QA Engineer", "Engineering Manager"],
      "Marketing": ["Marketing Specialist", "Content Strategist", "SEO Specialist", "Social Media Manager", "Marketing Director"],
      "Sales": ["Sales Representative", "Account Executive", "Sales Manager", "Business Development Manager"],
      "HR": ["HR Specialist", "Recruiter", "HR Manager", "Talent Acquisition Specialist"],
      "Finance": ["Financial Analyst", "Accountant", "Finance Manager", "Controller"],
      "Product": ["Product Manager", "Product Owner", "UX Designer", "UI Designer", "Product Director"],
      "Customer Support": ["Support Specialist", "Customer Success Manager", "Technical Support Engineer"],
      "Operations": ["Operations Manager", "Logistics Coordinator", "Supply Chain Analyst"],
      "General": ["Analyst", "Specialist", "Coordinator", "Manager", "Director"]
    };
    
    const deptPositions = positions[department] || positions["General"];
    return deptPositions[Math.floor(Math.random() * deptPositions.length)];
  };

  // Generate initial performance value with a bias toward good ratings
  const generateInitialPerformance = () => {
    const performances = ["Excellent", "Exceeds Expectations", "Meets Expectations", "Needs Improvement"];
    const weights = [0.25, 0.45, 0.2, 0.1];
    
    const random = Math.random();
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += weights[i];
      if (random < sum) return performances[i];
    }
    return performances[1];
  };

  // Generate random strengths for employees
  const generateRandomStrengths = () => {
    const strengths = [
      "Exceptional problem-solving abilities, consistently delivering innovative solutions to complex challenges",
      "Outstanding leadership skills, effectively guiding team members and fostering a collaborative environment",
      "Superior technical expertise, demonstrating deep knowledge in specialized areas critical to project success",
      "Excellent communication skills, clearly articulating complex concepts to diverse stakeholders",
      "Remarkable attention to detail, ensuring deliverables consistently meet the highest quality standards",
      "Proactive approach to challenges, identifying potential issues and implementing preventative measures",
      "Strong analytical thinking, effectively evaluating situations and making data-driven decisions",
      "Exceptional adaptability, quickly adjusting to changing priorities and requirements",
      "Exemplary time management, consistently delivering projects ahead of schedule",
      "Outstanding mentorship capabilities, actively contributing to team members' professional development"
    ];
    
    const count = Math.floor(Math.random() * 2) + 2;
    const selectedStrengths = [];
    
    while (selectedStrengths.length < count) {
      const randomIndex = Math.floor(Math.random() * strengths.length);
      const strength = strengths[randomIndex];
      if (!selectedStrengths.includes(strength)) selectedStrengths.push(strength);
    }
    
    return selectedStrengths.join("; ");
  };

  // Generate random areas for improvement
  const generateRandomAreasForImprovement = () => {
    const areasForImprovement = [
      "Could enhance technical documentation practices to better support knowledge transfer across teams",
      "Would benefit from developing more strategic thinking to align individual contributions with broader organizational goals",
      "Should focus on improving delegation skills to optimize team efficiency and promote professional growth of colleagues",
      "Opportunity to develop more effective cross-functional collaboration to enhance project outcomes",
      "Could strengthen presentation skills to more effectively communicate with executive stakeholders",
      "Would benefit from additional training in project management methodologies to improve planning and execution",
      "Should work on providing more constructive feedback to team members to support their professional development",
      "Could improve prioritization of tasks to better manage competing deadlines and responsibilities",
      "Would benefit from developing deeper technical expertise in emerging technologies relevant to the department",
      "Should focus on developing more comprehensive risk assessment approaches in project planning"
    ];
    
    const count = Math.floor(Math.random() * 2) + 1;
    const selectedAreas = [];
    
    while (selectedAreas.length < count) {
      const randomIndex = Math.floor(Math.random() * areasForImprovement.length);
      const area = areasForImprovement[randomIndex];
      if (!selectedAreas.includes(area)) selectedAreas.push(area);
    }
    
    return selectedAreas.join("; ");
  };

  // Generate random goals
  const generateRandomGoals = () => {
    const goals = [
      "Complete advanced certification in relevant field within the next two quarters to enhance technical expertise",
      "Implement and lead a cross-functional initiative to improve departmental efficiency by at least 15%",
      "Develop and document three process improvements that can be implemented across the organization",
      "Take ownership of mentoring two junior team members, with structured development plans and monthly check-ins",
      "Lead the implementation of a new technology solution that addresses a significant business challenge",
      "Reduce project delivery time by 20% through implementation of enhanced project management methodologies",
      "Establish and maintain key performance metrics for the team that align with organizational objectives",
      "Create and deliver three knowledge-sharing sessions on technical specialties to promote cross-training",
      "Develop expertise in emerging technologies through structured learning plan and practical application",
      "Collaborate with marketing team to publish two technical articles demonstrating thought leadership"
    ];
    
    const selectedGoals = [];
    while (selectedGoals.length < 2) {
      const randomIndex = Math.floor(Math.random() * goals.length);
      const goal = goals[randomIndex];
      if (!selectedGoals.includes(goal)) selectedGoals.push(goal);
    }
    
    return selectedGoals.join("; ");
  };

  // Performance statistics - computed values based on reviews
  const performanceStatistics = useMemo(() => {
    const reviewValues = Object.values(reviews);
    const completedReviews = reviewValues.filter(review => review.reviewStatus === "completed");
    
    // Calculate average ratings
    const avgRating = reviewValues.reduce((sum, review) => sum + (review.rating || 0), 0) / 
                     (reviewValues.length || 1);
    
    // Performance distribution
    const performanceDistribution = {
      "Excellent": reviewValues.filter(r => r.performance === "Excellent").length,
      "Exceeds Expectations": reviewValues.filter(r => r.performance === "Exceeds Expectations").length,
      "Meets Expectations": reviewValues.filter(r => r.performance === "Meets Expectations").length,
      "Needs Improvement": reviewValues.filter(r => r.performance === "Needs Improvement").length
    };
    
    // Department-wise performance
    const departmentPerformance = {};
    employees.forEach(emp => {
      const dept = emp.department || "Unknown";
      if (!departmentPerformance[dept]) {
        departmentPerformance[dept] = {
          count: 0,
          ratingSum: 0,
          excellent: 0,
          exceedsExpectations: 0,
          meetsExpectations: 0,
          needsImprovement: 0
        };
      }
      
      const review = reviews[emp.id];
      if (review) {
        departmentPerformance[dept].count++;
        departmentPerformance[dept].ratingSum += review.rating || 0;
        
        if (review.performance === "Excellent") departmentPerformance[dept].excellent++;
        else if (review.performance === "Exceeds Expectations") departmentPerformance[dept].exceedsExpectations++;
        else if (review.performance === "Meets Expectations") departmentPerformance[dept].meetsExpectations++;
        else if (review.performance === "Needs Improvement") departmentPerformance[dept].needsImprovement++;
      }
    });
    
    // Calculate averages for each department
    Object.keys(departmentPerformance).forEach(dept => {
      departmentPerformance[dept].avgRating = 
        departmentPerformance[dept].ratingSum / departmentPerformance[dept].count;
    });
    
    return {
      avgRating,
      performanceDistribution,
      departmentPerformance,
      completedPercentage: (completedReviews.length / reviewValues.length) * 100 || 0,
      totalEmployees: employees.length,
      completedReviews: completedReviews.length
    };
  }, [reviews, employees]);

  // Filter and sort employees
  const filteredAndSortedEmployees = useMemo(() => {
    const filtered = employees.filter(employee => {
      const fullName = `${employee.first_name} ${employee.last_name}`.toLowerCase();
      const department = (employee.department || "").toLowerCase();
      const position = (employee.position || "").toLowerCase();
      const query = searchQuery.toLowerCase();
      
      const matchesSearch = fullName.includes(query) || 
                          department.includes(query) || 
                          position.includes(query);
      
      if (!matchesSearch) return false;
      
      if (filter === "all") return true;
      if (filter === "completed") return reviews[employee.id]?.reviewStatus === "completed";
      if (filter === "pending") return reviews[employee.id]?.reviewStatus === "pending";
      if (filter === "excellent") return reviews[employee.id]?.performance === "Excellent";
      if (filter === "exceeds") return reviews[employee.id]?.performance === "Exceeds Expectations";
      if (filter === "meets") return reviews[employee.id]?.performance === "Meets Expectations";
      if (filter === "improvement") return reviews[employee.id]?.performance === "Needs Improvement";
      
      return true;
    });
    
    return [...filtered].sort((a, b) => {
      let valA, valB;
      
      switch (sortOrder.field) {
        case "last_name":
          valA = a.last_name?.toLowerCase();
          valB = b.last_name?.toLowerCase();
          break;
        case "department":
          valA = a.department?.toLowerCase();
          valB = b.department?.toLowerCase();
          break;
        case "position":
          valA = a.position?.toLowerCase();
          valB = b.position?.toLowerCase();
          break;
        case "rating":
          valA = reviews[a.id]?.rating || 0;
          valB = reviews[b.id]?.rating || 0;
          break;
        case "performance":
          const performanceOrder = {
            "Excellent": 4,
            "Exceeds Expectations": 3,
            "Meets Expectations": 2,
            "Needs Improvement": 1
          };
          valA = performanceOrder[reviews[a.id]?.performance] || 0;
          valB = performanceOrder[reviews[b.id]?.performance] || 0;
          break;
        default:
          valA = a.last_name?.toLowerCase();
          valB = b.last_name?.toLowerCase();
      }
      
      if (sortOrder.direction === "asc") {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });
  }, [employees, reviews, searchQuery, filter, sortOrder]);

  // Handle selecting an employee
  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setActiveTab("overview");
  };

  // Handle saving a review
  const handleSaveReview = async (employeeId, reviewData) => {
    setIsSubmitting(true);
    
    try {
      const updatedReviews = {
        ...reviews,
        [employeeId]: {
          ...reviews[employeeId],
          ...reviewData,
          reviewStatus: "completed",
          reviewDate: new Date().toLocaleDateString(),
          completedBy: "Your Name" // Replace with actual reviewer name
        }
      };
      
      setReviews(updatedReviews);
      setSuccessMessage("Review saved successfully!");
      setShowConfirmation(true);
      
      setTimeout(() => {
        setSuccessMessage("");
        setShowConfirmation(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle closing the employee detail view
  const handleCloseDetail = () => {
    setSelectedEmployee(null);
  };

  // Handle changing the performance rating
  const handlePerformanceChange = (employeeId, performance) => {
    const updatedReviews = {
      ...reviews,
      [employeeId]: {
        ...reviews[employeeId],
        performance
      }
    };
    setReviews(updatedReviews);
  };

  // Handle updating review comments
  const handleCommentsChange = (employeeId, comments) => {
    const updatedReviews = {
      ...reviews,
      [employeeId]: {
        ...reviews[employeeId],
        comments
      }
    };
    setReviews(updatedReviews);
  };

  // Handle changing criteria ratings
  const handleCriteriaChange = (employeeId, criteriaId, rating) => {
    const updatedReviews = {
      ...reviews,
      [employeeId]: {
        ...reviews[employeeId],
        criteria: {
          ...reviews[employeeId].criteria,
          [criteriaId]: rating
        }
      }
    };
    setReviews(updatedReviews);
  };

  // Handle sorting
  const handleSort = (field) => {
    setSortOrder(prev => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  // Toggle criteria expansion
  const toggleCriteriaExpansion = (criteriaId) => {
    setExpandedCriteria(prev => ({
      ...prev,
      [criteriaId]: !prev[criteriaId]
    }));
  };

  // Get status color based on performance
  const getStatusColor = (performance) => {
    switch (performance) {
      case "Excellent": return "bg-green-100 text-green-800";
      case "Exceeds Expectations": return "bg-blue-100 text-blue-800";
      case "Meets Expectations": return "bg-yellow-100 text-yellow-800";
      case "Needs Improvement": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Get status icon based on performance
  const getStatusIcon = (performance) => {
    switch (performance) {
      case "Excellent": return <ChevronsUp className="w-5 h-5 text-green-500" />;
      case "Exceeds Expectations": return <ChevronUp className="w-5 h-5 text-blue-500" />;
      case "Meets Expectations": return <Check className="w-5 h-5 text-yellow-500" />;
      case "Needs Improvement": return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Check className="w-5 h-5 text-gray-500" />;
    }
  };

  // Get face icon for rating
  const getFaceIcon = (rating) => {
    if (rating >= 4.5) return <Smile className="w-5 h-5 text-green-500" />;
    if (rating >= 3.5) return <Smile className="w-5 h-5 text-blue-500" />;
    if (rating >= 2.5) return <Meh className="w-5 h-5 text-yellow-500" />;
    return <Frown className="w-5 h-5 text-red-500" />;
  };

  // Format a number to display with one decimal place
  const formatRating = (rating) => {
    return parseFloat(rating).toFixed(1);
  };

  // Calculate overall score based on criteria
  const calculateOverallScore = (criteria) => {
    if (!criteria) return 0;
    const criteriaValues = Object.values(criteria);
    if (criteriaValues.length === 0) return 0;
    const sum = criteriaValues.reduce((acc, val) => acc + val, 0);
    return sum / criteriaValues.length;
  };

  // Prepare data for performance distribution chart
  const performanceChartData = {
    labels: Object.keys(performanceStatistics.performanceDistribution),
    datasets: [
      {
        label: 'Employees',
        data: Object.values(performanceStatistics.performanceDistribution),
        backgroundColor: [
          '#10B981', // Excellent - green
          '#3B82F6', // Exceeds - blue
          '#F59E0B', // Meets - yellow
          '#EF4444'  // Needs Improvement - red
        ],
        borderColor: [
          '#0E9F6E',
          '#2563EB',
          '#D97706',
          '#DC2626'
        ],
        borderWidth: 1
      }
    ]
  };

  // Prepare data for department performance chart
  const departmentChartData = {
    labels: Object.keys(performanceStatistics.departmentPerformance),
    datasets: [
      {
        label: 'Average Rating',
        data: Object.values(performanceStatistics.departmentPerformance).map(dept => dept.avgRating),
        backgroundColor: '#3B82F6',
        borderColor: '#2563EB',
        borderWidth: 1
      }
    ]
  };

  // Handle print functionality
  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  return (
    <div className={`container mx-auto px-4 py-8 bg-gray-50 min-h-screen ${isPrinting ? 'print-mode' : ''}`}>
      <header className="mb-8 print:hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Employee Performance Reviews</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Review Period: {reviewPeriod}</span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2">
            <button 
              onClick={handlePrint}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-50"
            >
              <FileText className="w-4 h-4 mr-2" />
              Print Review
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Reviews
            </button>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {showConfirmation && (
        <div className="fixed top-4 right-4 z-50 mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center shadow-lg max-w-md animate-fade-in">
          <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <div>
            <p className="font-semibold">Review Saved Successfully</p>
            <p className="text-sm">The performance review for {selectedEmployee?.first_name} has been updated.</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {selectedEmployee ? (
        // Employee Detail View
        <div className="bg-white rounded-xl shadow-lg mb-8 print:shadow-none print:border print:border-gray-200">
          {/* Navigation and Header */}
          <div className="p-6 border-b border-gray-200 print:border-b-0">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={handleCloseDetail}
                className="flex items-center text-blue-600 hover:text-blue-800 print:hidden"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back to All Employees
              </button>
              
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  reviews[selectedEmployee.id]?.reviewStatus === "completed" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-yellow-100 text-yellow-800"
                }`}>
                  {reviews[selectedEmployee.id]?.reviewStatus === "completed" 
                    ? "Completed" 
                    : "Pending Review"}
                </span>
                {reviews[selectedEmployee.id]?.reviewStatus === "completed" && (
                  <span className="text-xs text-gray-500">
                    Completed by: {reviews[selectedEmployee.id]?.completedBy || "Manager"}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-3 rounded-full mr-4">
                  <User className="w-12 h-12 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{`${selectedEmployee.first_name} ${selectedEmployee.last_name}`}</h2>
                  <p className="text-gray-600">{selectedEmployee.position} • {selectedEmployee.department}</p>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col items-end">
                <div className="flex items-center mb-1">
                  {getFaceIcon(reviews[selectedEmployee.id]?.rating || 0)}
                  <span className="font-semibold text-lg ml-2">{formatRating(reviews[selectedEmployee.id]?.rating || 0)}</span>
                  <span className="text-gray-500 text-sm ml-1">/ 10</span>
                </div>
                <p className="text-sm text-gray-500">Last Review: {reviews[selectedEmployee.id]?.lastReview || "N/A"}</p>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mt-6 print:hidden">
              <button
                className={`pb-3 px-4 font-medium ${
                  activeTab === "overview" 
                  ? "text-blue-600 border-b-2 border-blue-600" 
                  : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`pb-3 px-4 font-medium ${
                  activeTab === "performance" 
                  ? "text-blue-600 border-b-2 border-blue-600" 
                  : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("performance")}
              >
                Performance Criteria
              </button>
              <button
                className={`pb-3 px-4 font-medium ${
                  activeTab === "development" 
                  ? "text-blue-600 border-b-2 border-blue-600" 
                  : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("development")}
              >
                Development Plan
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="p-6 print:p-4">
            {activeTab === "overview" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2">
                      <Briefcase className="w-5 h-5 text-gray-500 mr-2" />
                      <h3 className="font-semibold">Position</h3>
                    </div>
                    <p>{selectedEmployee.position}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2">
                      <Buildings className="w-5 h-5 text-gray-500 mr-2" />
                      <h3 className="font-semibold">Department</h3>
                    </div>
                    <p>{selectedEmployee.department}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-gray-500 mr-2" />
                      <h3 className="font-semibold">Hire Date</h3>
                    </div>
                    <p>{selectedEmployee.hire_date || "N/A"}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-3">Performance Rating</label>
                  <div className="flex flex-wrap gap-2">
                    {["Excellent", "Exceeds Expectations", "Meets Expectations", "Needs Improvement"].map(rating => (
                      <button
                        key={rating}
                        className={`px-4 py-2 rounded-full border transition-colors ${
                          reviews[selectedEmployee.id]?.performance === rating 
                          ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => handlePerformanceChange(selectedEmployee.id, rating)}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Overall Rating</label>
                  <div className="flex items-center">
                    <div className="relative w-full bg-gray-200 rounded-full h-4 mr-4">
                      <div 
                        className="absolute top-0 left-0 h-4 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                        style={{ width: `${(reviews[selectedEmployee.id]?.rating || 0) * 10}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold">{formatRating(reviews[selectedEmployee.id]?.rating || 0)}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Key Strengths</label>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    {reviews[selectedEmployee.id]?.strengths.split(';').map((strength, i) => (
                      <p key={i} className="mb-2 last:mb-0 flex">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>{strength.trim()}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Areas for Improvement</label>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    {reviews[selectedEmployee.id]?.areas_for_improvement.split(';').map((area, i) => (
                      <p key={i} className="mb-2 last:mb-0 flex">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>{area.trim()}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Performance Goals</label>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    {reviews[selectedEmployee.id]?.goals.split(';').map((goal, i) => (
                      <p key={i} className="mb-2 last:mb-0 flex">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>{goal.trim()}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="comments" className="block text-gray-700 font-semibold mb-2">Manager's Comments</label>
                  <textarea
                    id="comments"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                    value={reviews[selectedEmployee.id]?.comments || ""}
                    onChange={(e) => handleCommentsChange(selectedEmployee.id, e.target.value)}
                    placeholder="Enter additional comments about this employee's performance..."
                  ></textarea>
                </div>
              </div>
            )}

            {activeTab === "performance" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Performance Criteria Evaluation</h3>
                <p className="text-gray-600 mb-6">Rate the employee on each of the following performance criteria.</p>
                
                {/* Rating Scale Legend */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-blue-800 mb-3">Rating Scale</h4>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    {ratingScale.map(scale => (
                      <div key={scale.value} className="bg-white p-3 rounded border border-gray-200">
                        <div className="flex items-center mb-1">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                            scale.value >= 4 ? 'bg-green-100 text-green-800' :
                            scale.value >= 3 ? 'bg-blue-100 text-blue-800' :
                            scale.value >= 2 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {scale.value}
                          </div>
                          <span className="font-medium">{scale.label}</span>
                        </div>
                        <p className="text-xs text-gray-600">{scale.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Criteria Evaluation */}
                <div className="space-y-4">
                  {criteriaCategories.map(category => (
                    <div key={category.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div 
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleCriteriaExpansion(category.id)}
                      >
                        <div>
                          <h4 className="font-medium">{category.name}</h4>
                          {expandedCriteria[category.id] && (
                            <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                          )}
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center mr-4">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                className={`mx-1 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                  reviews[selectedEmployee.id]?.criteria[category.id] >= star
                                    ? 'bg-blue-100 text-blue-600 font-medium'
                                    : 'bg-white text-gray-400 border border-gray-300 hover:bg-gray-50'
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCriteriaChange(selectedEmployee.id, category.id, star);
                                }}
                              >
                                {star}
                              </button>
                            ))}
                          </div>
                          <ChevronRight 
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                              expandedCriteria[category.id] ? 'transform rotate-90' : ''
                            }`}
                          />
                        </div>
                      </div>
                      
                      {expandedCriteria[category.id] && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                            rows="3"
                            placeholder={`Enter specific comments about ${selectedEmployee.first_name}'s ${category.name.toLowerCase()}...`}
                          ></textarea>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Overall Score Summary */}
                <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Overall Criteria Score</h4>
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="text-3xl font-bold text-blue-600 mr-6 mb-4 md:mb-0">
                      {formatRating(calculateOverallScore(reviews[selectedEmployee.id]?.criteria))}
                      <span className="text-lg text-blue-500">/5</span>
                    </div>
                    <div className="flex-1">
                      <div className="relative w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div 
                          className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                          style={{ width: `${(calculateOverallScore(reviews[selectedEmployee.id]?.criteria) / 5) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Unsatisfactory</span>
                        <span>Outstanding</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "development" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Professional Development Plan</h3>
                <p className="text-gray-600 mb-6">Outline the employee's development goals and action items.</p>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Recommended Development Activities</label>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    {reviews[selectedEmployee.id]?.developmentPlan.split(';').map((plan, i) => (
                      <div key={i} className="mb-3 last:mb-0 p-3 bg-white rounded border border-gray-200 flex items-start">
                        <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                          <Target className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{plan.trim()}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Target completion: Q3 2023</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Add New Development Goal</label>
                  <div className="flex">
                    <input
                      type="text"
                      className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter a new development goal..."
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Employee Development Notes</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                    placeholder="Enter any additional notes about the employee's development plan..."
                  ></textarea>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer with Save Button */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg flex justify-end print:hidden">
            <button
              onClick={() => handleSaveReview(selectedEmployee.id, reviews[selectedEmployee.id])}
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {reviews[selectedEmployee.id]?.reviewStatus === "completed" ? "Update Review" : "Complete Review"}
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        // Employee List View
        <div>
          {/* Filters and Search */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search employees by name, department, or position..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <select
                    className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all">All Employees</option>
                    <option value="completed">Completed Reviews</option>
                    <option value="pending">Pending Reviews</option>
                    <option value="excellent">Excellent</option>
                    <option value="exceeds">Exceeds Expectations</option>
                    <option value="meets">Meets Expectations</option>
                    <option value="improvement">Needs Improvement</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <button className="bg-white border border-gray-300 rounded-lg p-2 shadow-sm hover:bg-gray-50">
                  <Filter className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Performance Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Employees</p>
                  <p className="text-2xl font-semibold">{performanceStatistics.totalEmployees}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Avg. Rating</p>
                  <p className="text-2xl font-semibold">{formatRating(performanceStatistics.avgRating)}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Reviews Completed</p>
                  <p className="text-2xl font-semibold">
                    {performanceStatistics.completedReviews}/{performanceStatistics.totalEmployees}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    ({Math.round(performanceStatistics.completedPercentage)}%)
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Top Department</p>
                  <p className="text-2xl font-semibold">
                    {Object.entries(performanceStatistics.departmentPerformance).length > 0 
                      ? Object.entries(performanceStatistics.departmentPerformance)
                          .sort((a, b) => b[1].avgRating - a[1].avgRating)[0][0]
                      : "N/A"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {Object.entries(performanceStatistics.departmentPerformance).length > 0 
                      ? formatRating(Object.entries(performanceStatistics.departmentPerformance)
                          .sort((a, b) => b[1].avgRating - a[1].avgRating)[0][1].avgRating)
                      : ""}
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Performance Distribution */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Performance Distribution</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                  <BarChart2 className="w-4 h-4 mr-1" />
                  View Details
                </button>
              </div>
              <div className="h-64">
                <Pie 
                  data={performanceChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const percentage = Math.round((value / employees.length) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
            
            {/* Department Performance */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Department Performance</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                  <BarChart2 className="w-4 h-4 mr-1" />
                  View Details
                </button>
              </div>
              <div className="h-64">
                <Bar 
                  data={departmentChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                          stepSize: 2
                        }
                      }
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return `Avg. Rating: ${context.raw}`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Employee List Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("last_name")}
                    >
                      <div className="flex items-center">
                        Employee
                        {sortOrder.field === "last_name" && (
                          <ChevronDown className={`ml-1 w-4 h-4 ${sortOrder.direction === "desc" ? "transform rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("department")}
                    >
                      <div className="flex items-center">
                        Department
                        {sortOrder.field === "department" && (
                          <ChevronDown className={`ml-1 w-4 h-4 ${sortOrder.direction === "desc" ? "transform rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("position")}
                    >
                      <div className="flex items-center">
                        Position
                        {sortOrder.field === "position" && (
                          <ChevronDown className={`ml-1 w-4 h-4 ${sortOrder.direction === "desc" ? "transform rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("performance")}
                    >
                      <div className="flex items-center">
                        Performance
                        {sortOrder.field === "performance" && (
                          <ChevronDown className={`ml-1 w-4 h-4 ${sortOrder.direction === "desc" ? "transform rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("rating")}
                    >
                      <div className="flex items-center">
                        Rating
                        {sortOrder.field === "rating" && (
                          <ChevronDown className={`ml-1 w-4 h-4 ${sortOrder.direction === "desc" ? "transform rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedEmployees.map(employee => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{`${employee.first_name} ${employee.last_name}`}</div>
                            <div className="text-sm text-gray-500">{employee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{employee.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{employee.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(reviews[employee.id]?.performance)}
                          <span className={`ml-2 text-sm font-medium ${
                            reviews[employee.id]?.performance === "Excellent" ? "text-green-600" :
                            reviews[employee.id]?.performance === "Exceeds Expectations" ? "text-blue-600" :
                            reviews[employee.id]?.performance === "Meets Expectations" ? "text-yellow-600" :
                            reviews[employee.id]?.performance === "Needs Improvement" ? "text-red-600" :
                            "text-gray-600"
                          }`}>
                            {reviews[employee.id]?.performance || "Not Rated"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                              style={{ width: `${(reviews[employee.id]?.rating || 0) * 10}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500">{formatRating(reviews[employee.id]?.rating || 0)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          reviews[employee.id]?.reviewStatus === "completed" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {reviews[employee.id]?.reviewStatus === "completed" ? "Completed" : "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleSelectEmployee(employee)}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          {reviews[employee.id]?.reviewStatus === "completed" ? "View" : "Start"}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-mode, .print-mode * {
            visibility: visible;
          }
          .print-mode {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PerformanceReviewPage;