"use client";

import { 
  FaFilePdf, 
  FaFileWord, 
  FaFileExcel, 
  FaFileImage, 
  FaSearch, 
  FaFolder,
  FaDownload,
  FaEllipsisV,
  FaUpload,
  FaTimes
} from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

// Enhanced with realistic HR documents
const documentData = {
  folders: [
    {
      id: 1,
      name: "Employee Records",
      color: "text-yellow-500",
      files: [
        { 
          id: 101, 
          name: "Employment_Contract_Template_2023.pdf", 
          type: "pdf", 
          size: "2.4 MB", 
          uploaded: "2023-10-15",
          description: "Standard employment contract template for new hires"
        },
        { 
          id: 102, 
          name: "NDA_Agreement_v4.docx", 
          type: "word", 
          size: "1.1 MB", 
          uploaded: "2023-09-28",
          description: "Non-disclosure agreement for employees and contractors"
        },
        { 
          id: 103, 
          name: "Employee_Personal_Details_Form.xlsx", 
          type: "excel", 
          size: "0.3 MB", 
          uploaded: "2023-11-02",
          description: "Form for collecting employee personal information"
        },
        { 
          id: 104, 
          name: "Exit_Interview_Questionnaire.pdf", 
          type: "pdf", 
          size: "1.8 MB", 
          uploaded: "2023-08-17",
          description: "Standard questions for departing employees"
        }
      ]
    },
    {
      id: 2,
      name: "Company Policies",
      color: "text-blue-500",
      files: [
        { 
          id: 201, 
          name: "Employee_Handbook_2023_Q4.pdf", 
          type: "pdf", 
          size: "5.2 MB", 
          uploaded: "2023-11-01",
          description: "Complete company policies and procedures"
        },
        { 
          id: 202, 
          name: "Remote_Work_Policy_v2.docx", 
          type: "word", 
          size: "0.8 MB", 
          uploaded: "2023-08-14",
          description: "Guidelines for remote and hybrid work arrangements"
        },
        { 
          id: 203, 
          name: "Anti_Harassment_Policy.pdf", 
          type: "pdf", 
          size: "2.1 MB", 
          uploaded: "2023-07-22",
          description: "Company stance on workplace harassment"
        },
        { 
          id: 204, 
          name: "Social_Media_Guidelines.docx", 
          type: "word", 
          size: "1.2 MB", 
          uploaded: "2023-09-05",
          description: "Employee social media usage policy"
        }
      ]
    },
    {
      id: 3,
      name: "Training Materials",
      color: "text-green-500",
      files: [
        { 
          id: 301, 
          name: "Onboarding_Checklist_2023.xlsx", 
          type: "excel", 
          size: "0.5 MB", 
          uploaded: "2023-07-22",
          description: "Step-by-step onboarding process for new hires"
        },
        { 
          id: 302, 
          name: "Workplace_Safety_Training.pdf", 
          type: "pdf", 
          size: "3.7 MB", 
          uploaded: "2023-06-30",
          description: "Annual safety training materials"
        },
        { 
          id: 303, 
          name: "Diversity_Equity_Inclusion_Training.pptx", 
          type: "image", 
          size: "8.2 MB", 
          uploaded: "2023-05-15",
          description: "DEI training presentation slides"
        },
        { 
          id: 304, 
          name: "Leadership_Development_Program.pdf", 
          type: "pdf", 
          size: "4.5 MB", 
          uploaded: "2023-10-10",
          description: "Materials for emerging leaders program"
        }
      ]
    },
    {
      id: 4,
      name: "Payroll & Benefits",
      color: "text-purple-500",
      files: [
        { 
          id: 401, 
          name: "Payroll_Calendar_2024.xlsx", 
          type: "excel", 
          size: "0.2 MB", 
          uploaded: "2023-12-01",
          description: "Scheduled pay dates for the fiscal year"
        },
        { 
          id: 402, 
          name: "Benefits_Enrollment_Guide.pdf", 
          type: "pdf", 
          size: "3.2 MB", 
          uploaded: "2023-11-28",
          description: "Health insurance and benefits options"
        },
        { 
          id: 403, 
          name: "Retirement_Plan_Details.docx", 
          type: "word", 
          size: "1.5 MB", 
          uploaded: "2023-09-12",
          description: "401(k) and retirement benefit information"
        },
        { 
          id: 404, 
          name: "Expense_Reimbursement_Form.pdf", 
          type: "pdf", 
          size: "0.7 MB", 
          uploaded: "2023-08-20",
          description: "Form for submitting business expenses"
        }
      ]
    }
  ],
  recent: [
    { 
      id: 501, 
      name: "Q4_Performance_Review_Template.docx", 
      type: "word", 
      size: "1.8 MB", 
      uploaded: "2023-12-15",
      description: "Template for year-end performance evaluations",
      folder: "Performance Reviews"
    },
    { 
      id: 502, 
      name: "2024_Company_Holiday_Calendar.pdf", 
      type: "pdf", 
      size: "0.9 MB", 
      uploaded: "2023-12-10",
      description: "Approved holidays for the upcoming year",
      folder: "Company Policies"
    },
    { 
      id: 503, 
      name: "New_Employee_Orientation_Agenda.xlsx", 
      type: "excel", 
      size: "0.4 MB", 
      uploaded: "2023-12-05",
      description: "Schedule for new hire orientation sessions",
      folder: "Training Materials"
    }
  ]
};

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("all");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Combine all files for search
  const allFiles = [
    ...documentData.folders.flatMap(folder => 
      folder.files.map(file => ({ 
        ...file, 
        folder: folder.name,
        color: folder.color
      }))
    ),
    ...documentData.recent.map(file => ({ 
      ...file, 
      color: "text-gray-500"
    }))
  ];

  // Filter files based on search and view
  const filteredFiles = allFiles.filter(file => {
    const matchesSearch = searchQuery === "" || 
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.folder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (file.description && file.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesView = 
      currentView === "all" || 
      (currentView === "recent" && documentData.recent.some(f => f.id === file.id)) ||
      documentData.folders.some(f => f.name === currentView && f.files.some(f => f.id === file.id));
    
    return matchesSearch && matchesView;
  });

  const getFileIcon = (type) => {
    switch(type) {
      case "pdf": return <FaFilePdf className="text-red-500" />;
      case "word": return <FaFileWord className="text-blue-500" />;
      case "excel": return <FaFileExcel className="text-green-500" />;
      default: return <FaFileImage className="text-purple-500" />;
    }
  };

  const formatFileName = (name) => {
    return name
      .replace(/_/g, ' ')
      .replace(/\.[^/.]+$/, '') // Remove extension
      .replace(/([a-z])([A-Z])/g, '$1 $2'); // Add space before caps
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Document Management</h1>
          <p className="text-gray-600 mt-1">Central repository for all company documents</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaUpload className="mr-2" />
          Upload Document
        </button>
      </div>

      {/* Search and Navigation */}
      <div className="mb-8">
        <div className="relative mb-6">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents by name, folder, or description..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex overflow-x-auto pb-2 space-x-2">
          <button
            onClick={() => setCurrentView("all")}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${currentView === "all" ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            All Documents
          </button>
          <button
            onClick={() => setCurrentView("recent")}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${currentView === "recent" ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            Recently Added
          </button>
          {documentData.folders.map(folder => (
            <button
              key={folder.id}
              onClick={() => setCurrentView(folder.name)}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${currentView === folder.name ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {folder.name}
            </button>
          ))}
        </div>
      </div>

      {/* Document Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {currentView === "all" ? "All Documents" : 
           currentView === "recent" ? "Recently Added" : currentView}
        </h2>
        
        {filteredFiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <div 
                key={file.id} 
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedFile(file)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {getFileIcon(file.type)}
                    </div>
                    <div>
                      <h3 className="font-medium line-clamp-2">{formatFileName(file.name)}</h3>
                      <p className={`text-sm ${file.color || 'text-gray-500'}`}>{file.folder}</p>
                    </div>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-gray-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add menu functionality here
                    }}
                  >
                    <FaEllipsisV />
                  </button>
                </div>
                <div className="mt-3 text-sm text-gray-600 line-clamp-2">
                  {file.description}
                </div>
                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                  <span>{file.size}</span>
                  <span>{file.uploaded}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border-2 border-dashed rounded-lg">
            <p className="text-gray-500">No documents found</p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-2 text-blue-600 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>

      {/* File Preview Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center border-b p-4">
              <div>
                <h3 className="font-medium text-lg">{formatFileName(selectedFile.name)}</h3>
                <p className={`text-sm ${selectedFile.color || 'text-gray-500'}`}>
                  {selectedFile.folder}
                </p>
              </div>
              <button 
                onClick={() => setSelectedFile(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6 overflow-auto flex-grow">
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <div className="text-6xl mb-4">
                  {getFileIcon(selectedFile.type)}
                </div>
                <div className="text-center max-w-md">
                  <p className="mb-1 text-gray-600">{selectedFile.description}</p>
                  <div className="mt-6 text-left space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">File Type:</span> {selectedFile.name.split('.').pop().toUpperCase()}</p>
                    <p><span className="font-medium">Size:</span> {selectedFile.size}</p>
                    <p><span className="font-medium">Uploaded:</span> {selectedFile.uploaded}</p>
                    {selectedFile.folder && (
                      <p><span className="font-medium">Category:</span> {selectedFile.folder}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t p-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                <p>Last accessed: {new Date().toISOString().split('T')[0]}</p>
              </div>
              <div className="flex space-x-3">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                  <FaDownload />
                  Download
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="font-medium text-lg">Upload Document</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                  <FaUpload className="text-3xl text-gray-400" />
                </div>
                <p className="text-gray-600 mb-2">Drag and drop files here</p>
                <p className="text-sm text-gray-500 mb-4">or</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Browse Files
                </button>
                <p className="text-xs text-gray-500 mt-4">Supports: PDF, DOCX, XLSX, PPTX (Max 25MB)</p>
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Folder</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="">Select a folder</option>
                    {documentData.folders.map(folder => (
                      <option key={folder.id} value={folder.name}>{folder.name}</option>
                    ))}
                    <option value="new">Create New Folder</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    className="w-full p-2 border rounded-md" 
                    rows="3"
                    placeholder="Enter document description..."
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="border-t p-4 flex justify-end space-x-3">
              <button 
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}