import React, { useState, useRef } from 'react';
import { useData } from '../contexts/DataContext';
import { useCampaign } from '../contexts/CampaignContext';
import Papa from 'papaparse';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Users,
  Mail,
  X,
  Eye,
  Send,
  GraduationCap,
  Building
} from 'lucide-react';

const SupporterImport: React.FC = () => {
  const { importSupporters, supporters } = useData();
  const { templates } = useCampaign();
  const [csvData, setCsvData] = useState<any[]>([]);
  const [step, setStep] = useState<'upload' | 'preview' | 'complete' | 'select' | 'generate'>('upload');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedSupporters, setSelectedSupporters] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractBasicInfo = (row: any) => {
    // Extract name from common column variations
    const firstName = row['First Name'] || row['first_name'] || row['FirstName'] || row['Name']?.split(' ')[0] || '';
    const lastName = row['Last Name'] || row['last_name'] || row['LastName'] || row['Name']?.split(' ').slice(1).join(' ') || '';
    
    // Extract email from common variations
    const email = row['Email'] || row['email'] || row['Email Address'] || row['email_address'] || '';
    
    // Extract education/experience info
    const education = row['Education'] || row['education'] || row['School'] || row['University'] || row['Degree'] || '';
    const experience = row['Experience'] || row['experience'] || row['Work'] || row['Job'] || row['Position'] || row['Title'] || '';
    const company = row['Company'] || row['company'] || row['Organization'] || row['Employer'] || '';
    
    return {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      education: education.trim(),
      experience: experience.trim(),
      company: company.trim()
    };
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Process CSV files
    const csvFiles = newFiles.filter(file => file.name.endsWith('.csv'));
    
    if (csvFiles.length > 0) {
      // Process the first CSV file
      Papa.parse(csvFiles[0], {
        header: true,
        complete: (results) => {
          if (results.data && results.data.length > 0) {
            const processedData = results.data
              .map((row: any) => extractBasicInfo(row))
              .filter(person => person.firstName && person.lastName); // Only keep rows with names
            
            setCsvData(processedData);
            setStep('preview');
          }
        },
        error: (error) => {
          console.error('CSV parsing error:', error);
        }
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const processImport = () => {
    // Convert to supporter format and import
    const supporterData = csvData.map((person, index) => ({
      ...person,
      id: `imported_${Date.now()}_${index}`,
      phone: '',
      location: '',
      organization: person.company,
      urls: [],
      segmentScore: Math.floor(Math.random() * 100),
      segment: 'new' as const,
      tags: person.education ? ['education'] : [],
      totalDonations: 0,
      eventAttendance: 0,
      petitionsSigned: 0
    }));

    importSupporters(supporterData);
    setStep('complete');
  };

  const handleSupporterSelection = (supporterId: string) => {
    setSelectedSupporters(prev => 
      prev.includes(supporterId) 
        ? prev.filter(id => id !== supporterId)
        : [...prev, supporterId]
    );
  };

  const generatePersonalizedContent = () => {
    if (!selectedTemplate || selectedSupporters.length === 0) return;

    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return;

    const generated = selectedSupporters.map(supporterId => {
      const supporter = supporters.find(s => s.id === supporterId);
      if (!supporter) return null;

      // Replace template variables with supporter data
      let personalizedContent = template.content;
      let personalizedSubject = template.subject || '';

      // Replace common variables
      personalizedContent = personalizedContent
        .replace(/\{\{first_name\}\}/g, supporter.firstName)
        .replace(/\{\{last_name\}\}/g, supporter.lastName)
        .replace(/\{\{full_name\}\}/g, `${supporter.firstName} ${supporter.lastName}`)
        .replace(/\{\{organization\}\}/g, supporter.organization || 'your organization')
        .replace(/\{\{education\}\}/g, (supporter as any).education || 'your background')
        .replace(/\{\{experience\}\}/g, (supporter as any).experience || 'your experience');

      personalizedSubject = personalizedSubject
        .replace(/\{\{first_name\}\}/g, supporter.firstName)
        .replace(/\{\{last_name\}\}/g, supporter.lastName)
        .replace(/\{\{organization\}\}/g, supporter.organization || 'your organization');

      return {
        supporterId,
        supporter,
        template,
        personalizedSubject,
        personalizedContent,
        education: (supporter as any).education || '',
        experience: (supporter as any).experience || ''
      };
    }).filter(Boolean);

    setGeneratedContent(generated);
    setStep('generate');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Import Supporters</h1>
          <p className="text-gray-600 mt-1">Upload CSV files to import supporter data and generate personalized outreach</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          {['upload', 'preview', 'complete', 'select', 'generate'].map((stepName, index) => (
            <div key={stepName} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === stepName ? 'bg-blue-600 text-white' :
                ['upload', 'preview', 'complete', 'select', 'generate'].indexOf(step) > index ? 'bg-green-600 text-white' :
                'bg-gray-200 text-gray-600'
              }`}>
                {['upload', 'preview', 'complete', 'select', 'generate'].indexOf(step) > index ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                step === stepName ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {stepName.charAt(0).toUpperCase() + stepName.slice(1)}
              </span>
              {index < 4 && <div className="w-8 h-0.5 bg-gray-300 mx-2"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Upload Step */}
      {step === 'upload' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Files</h3>
            <p className="text-gray-600 mb-6">
              Upload CSV files with supporter information. The system will automatically extract names and education/experience data.
            </p>
            
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".csv,.xlsx,.xls"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
              <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <span className="text-sm text-gray-600">
                Drop CSV files here or click to select
              </span>
              <p className="text-xs text-gray-500 mt-2">
                Supports CSV and Excel files
              </p>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Uploaded Files</h4>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Preview Step */}
      {step === 'preview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Import Preview</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total records to import:</span>
                <span className="font-semibold">{csvData.length}</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Education</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Experience</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Company</th>
                  </tr>
                </thead>
                <tbody>
                  {csvData.slice(0, 10).map((person, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {person.firstName} {person.lastName}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{person.email || '-'}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{person.education || '-'}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{person.experience || '-'}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{person.company || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {csvData.length > 10 && (
              <p className="text-sm text-gray-500 mt-4">
                Showing first 10 rows of {csvData.length} total records
              </p>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep('upload')}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Back to Upload
            </button>
            <button
              onClick={processImport}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Import Supporters
            </button>
          </div>
        </div>
      )}

      {/* Complete Step */}
      {step === 'complete' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Import Complete!</h3>
            <p className="text-gray-600 mb-6">
              Successfully imported {csvData.length} supporters with their education and experience data.
            </p>
            <button
              onClick={() => setStep('select')}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Select Supporters for Outreach
            </button>
          </div>
        </div>
      )}

      {/* Select Supporters Step */}
      {step === 'select' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Select Supporters</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {selectedSupporters.length} selected
                </span>
                <button
                  onClick={() => setSelectedSupporters(supporters.map(s => s.id))}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Select All
                </button>
                <button
                  onClick={() => setSelectedSupporters([])}
                  className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {supporters.map(supporter => (
                <div
                  key={supporter.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedSupporters.includes(supporter.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleSupporterSelection(supporter.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      {supporter.firstName} {supporter.lastName}
                    </h4>
                    <input
                      type="checkbox"
                      checked={selectedSupporters.includes(supporter.id)}
                      onChange={() => handleSupporterSelection(supporter.id)}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{supporter.email}</p>
                  
                  {(supporter as any).education && (
                    <div className="flex items-center space-x-2 mb-1">
                      <GraduationCap className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-600">{(supporter as any).education}</span>
                    </div>
                  )}
                  
                  {(supporter as any).experience && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-600">{(supporter as any).experience}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      supporter.segment === 'major-donor' ? 'bg-green-100 text-green-800' :
                      supporter.segment === 'active-volunteer' ? 'bg-blue-100 text-blue-800' :
                      supporter.segment === 'engaged' ? 'bg-purple-100 text-purple-800' :
                      supporter.segment === 'new' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {supporter.segment.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep('complete')}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep('generate')}
                disabled={selectedSupporters.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Generate Outreach
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generate Step */}
      {step === 'generate' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Generate Personalized Outreach</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Template
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a template...</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name} ({template.type})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-3 mb-6">
              <button
                onClick={generatePersonalizedContent}
                disabled={!selectedTemplate || selectedSupporters.length === 0}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-5 w-5" />
                <span>Generate Content</span>
              </button>
              
              {generatedContent.length > 0 && (
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Eye className="h-5 w-5" />
                  <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
                </button>
              )}
            </div>

            {/* Generated Content Preview */}
            {showPreview && generatedContent.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900">
                  Generated Content ({generatedContent.length} messages)
                </h4>
                <div className="max-h-96 overflow-y-auto space-y-4">
                  {generatedContent.map((content, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h5 className="font-medium text-gray-900">
                            {content.supporter.firstName} {content.supporter.lastName}
                          </h5>
                          <p className="text-sm text-gray-600">{content.supporter.email}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          content.template.type === 'email' ? 'bg-blue-100 text-blue-800' :
                          content.template.type === 'sms' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {content.template.type}
                        </span>
                      </div>
                      
                      {content.personalizedSubject && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700">Subject:</p>
                          <p className="text-sm text-gray-900 bg-gray-50 rounded p-2">
                            {content.personalizedSubject}
                          </p>
                        </div>
                      )}
                      
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700">Content:</p>
                        <div className="text-sm text-gray-900 bg-gray-50 rounded p-2 whitespace-pre-wrap">
                          {content.personalizedContent}
                        </div>
                      </div>

                      {(content.education || content.experience) && (
                        <div className="border-t pt-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">Background Info:</p>
                          {content.education && (
                            <div className="flex items-center space-x-2 mb-1">
                              <GraduationCap className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{content.education}</span>
                            </div>
                          )}
                          {content.experience && (
                            <div className="flex items-center space-x-2">
                              <Building className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{content.experience}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep('select')}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Back to Selection
              </button>
              {generatedContent.length > 0 && (
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
                    Schedule Send
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    Send Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupporterImport;