'use client';

import React, { useState } from 'react';

interface Resource {
  name: string;
  rate: number;
}

interface ResourceEntry {
  resource: string;
  daysOfWeek: string;
  workDays: number;
  total: number;
  jama: number;
  paid: boolean;
}

interface Translations {
  weekdays: {
    english: Array<{ id: string; label: string }>;
    kannada: Array<{ id: string; label: string }>;
  };
  resources: {
    english: Resource[];
    kannada: Resource[];
  };
}

export default function ResourceTracker() {
  const [selectedResource, setSelectedResource] = useState('');
  const [workDays, setWorkDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  });
  const [jamaAmount, setJamaAmount] = useState('');
  const [entries, setEntries] = useState<ResourceEntry[]>([]);
  const [language, setLanguage] = useState<'english' | 'kannada'>('english');

  // Language translations
  interface DayInfo {
    id: keyof WorkDays;
    label: string;
  }

  const translations: Translations = {
    weekdays: {
      english: [
        { id: 'monday' as const, label: 'Monday' },
        { id: 'tuesday' as const, label: 'Tuesday' },
        { id: 'wednesday' as const, label: 'Wednesday' },
        { id: 'thursday' as const, label: 'Thursday' },
        { id: 'friday' as const, label: 'Friday' },
        { id: 'saturday' as const, label: 'Saturday' },
        { id: 'sunday' as const, label: 'Sunday' }
      ],
      kannada: [
        { id: 'monday' as const, label: 'ಸೋಮವಾರ' },
        { id: 'tuesday' as const, label: 'ಮಂಗಳವಾರ' },
        { id: 'wednesday' as const, label: 'ಬುಧವಾರ' },
        { id: 'thursday' as const, label: 'ಗುರುವಾರ' },
        { id: 'friday' as const, label: 'ಶುಕ್ರವಾರ' },
        { id: 'saturday' as const, label: 'ಶನಿವಾರ' },
        { id: 'sunday' as const, label: 'ಭಾನುವಾರ' }
      ]
    },
    resources: {
      english: [
        { name: 'Mani', rate: 400 },
        { name: 'Anni', rate: 400 },
        { name: 'Mahesha', rate: 400 },
        { name: 'Rekha', rate: 400 },
        { name: 'Ganesha', rate: 400 },
        { name: 'Madeva', rate: 400 },
        { name: 'Ravi', rate: 400 },
        { name: 'Ammu', rate: 350 },
        { name: 'Lalitha', rate: 350 },
        { name: 'Padma', rate: 350 },
        { name: 'Yashoda', rate: 350 },
        { name: 'Anusuya', rate: 350 },
        { name: 'Uma', rate: 350 },
        { name: 'Shanti', rate: 350 },
        { name: 'Saroja', rate: 350 },
        { name: 'Geetha', rate: 350 },
        { name: 'Anjali', rate: 350 },
        { name: 'Basanthi', rate: 350 },
        { name: 'Pushpa', rate: 350 },
        { name: 'Gowramma', rate: 350 },
        { name: 'Vedavathi', rate: 350 },
        { name: 'Podiya', rate: 400 },
        { name: 'Kumara', rate: 400 },
        { name: 'Marigowda', rate: 400 },
        { name: 'Bagyamma', rate: 350 },
        { name: 'Rashmi', rate: 350 },
        { name: 'Shubha', rate: 350 },
        { name: 'Lakshmi', rate: 350 }
      ],
      kannada: [
        { name: 'ಮಣಿ', rate: 400 },
        { name: 'ಅನ್ನಿ', rate: 400 },
        { name: 'ಮಹೇಶ', rate: 400 },
        { name: 'ರೇಖಾ', rate: 400 },
        { name: 'ಗಣೇಶ', rate: 400 },
        { name: 'ಮಾದೇವ', rate: 400 },
        { name: 'ರವಿ', rate: 400 },
        { name: 'ಅಮ್ಮು', rate: 350 },
        { name: 'ಲಲಿತ', rate: 350 },
        { name: 'ಪದ್ಮ', rate: 350 },
        { name: 'ಯಶೋದ', rate: 350 },
        { name: 'ಅನುಸೂಯ', rate: 350 },
        { name: 'ಉಮಾ', rate: 350 },
        { name: 'ಶಾಂತಿ', rate: 350 },
        { name: 'ಸರೋಜ', rate: 350 },
        { name: 'ಗೀತಾ', rate: 350 },
        { name: 'ಅಂಜಲಿ', rate: 350 },
        { name: 'ಬಸಂತಿ', rate: 350 },
        { name: 'ಪುಷ್ಪ', rate: 350 },
        { name: 'ಗೌರಮ್ಮ', rate: 350 },
        { name: 'ವೇದವತಿ', rate: 350 },
        { name: 'ಪೋಡಿಯ', rate: 400 },
        { name: 'ಕುಮಾರ', rate: 400 },
        { name: 'ಮಾರಿಗೌಡ', rate: 400 },
        { name: 'ಭಾಗ್ಯಮ್ಮ', rate: 350 },
        { name: 'ರಶ್ಮಿ', rate: 350 },
        { name: 'ಶುಭ', rate: 350 },
        { name: 'ಲಕ್ಷ್ಮಿ', rate: 350 }
      ]
    }
  };

  // Get available resources
  const availableResources = React.useMemo(() => {
    return translations.resources[language]
      .filter(resource => !entries.some(entry => entry.resource === resource.name))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [language, entries, translations.resources]);

  const days = translations.weekdays[language] as DayInfo[];

  const handleDayChange = (day) => {
    setWorkDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const getSelectedResourceRate = () => {
    const resource = translations.resources[language].find(r => r.name === selectedResource);
    return resource ? resource.rate : 0;
  };

  const getSelectedDaysString = () => {
    return Object.entries(workDays)
      .filter(([, checked]) => checked)
      .map(([day]) => {
        const dayObj = days.find(d => d.id === day);
        return dayObj ? dayObj.label : '';
      })
      .join(', ');
  };

  const handleSubmit = () => {
    const totalDays = Object.values(workDays).filter(Boolean).length;
    const rate = getSelectedResourceRate();
    const totalAmount = rate * totalDays;

    const newEntry = {
      resource: selectedResource,
      daysOfWeek: getSelectedDaysString(),
      workDays: totalDays,
      total: totalAmount,
      jama: parseInt(jamaAmount || '0'),
      paid: false
    };

    setEntries(prev => [...prev, newEntry]);

    // Reset form
    setSelectedResource('');
    setWorkDays({
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    });
    setJamaAmount('');
  };

  const handlePaidChange = (index) => {
    setEntries(prev => prev.map((entry, i) => 
      i === index ? { ...entry, paid: !entry.paid } : entry
    ));
  };

  const downloadCSV = () => {
    try {
      // Create CSV content
      const csvRows = [
        // Header row
        ['Resource', 'Days of the Week', 'Work Days', 'Total', 'Jama', 'Net Payment', 'Paid'],
        // Data rows
        ...entries.map(entry => [
          entry.resource,
          `"${entry.daysOfWeek}"`,
          entry.workDays,
          entry.total,
          entry.jama,
          entry.total - entry.jama,
          entry.paid ? 'Yes' : 'No'
        ])
      ];

      // Convert rows to CSV string with proper line endings
      const csvContent = '\ufeff' + csvRows.map(row => row.join(',')).join('\r\n');

      // Download the file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const today = new Date().toISOString().split('T')[0];
      a.download = `resource-report-${today}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error generating CSV:', error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-end mb-4">
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded px-3 py-1 text-gray-800 font-medium"
        >
          <option value="english">English</option>
          <option value="kannada">ಕನ್ನಡ</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Resource Work Day Tracker</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-800">Select Resource</label>
          <select
            value={selectedResource}
            onChange={(e) => setSelectedResource(e.target.value)}
            className="w-full border rounded px-3 py-2 text-gray-800 font-medium bg-white"
          >
            <option value="">Choose a resource</option>
            {availableResources.map(resource => (
              <option key={resource.name} value={resource.name}>
                {resource.name} (₹{resource.rate})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3 text-gray-800">Work Days</label>
          <div className="grid grid-cols-2 gap-4">
            {days.map(({ id, label }) => (
              <div key={id} className="flex items-center">
                <input
                  type="checkbox"
                  id={id}
                  checked={workDays[id]}
                  onChange={() => handleDayChange(id)}
                  className="mr-3 h-4 w-4"
                />
                <label htmlFor={id} className="text-gray-800 font-medium">
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-800">Jama (Loan Repayment)</label>
          <input
            type="number"
            value={jamaAmount}
            onChange={(e) => setJamaAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border rounded px-3 py-2 text-gray-800 font-medium"
          />
        </div>

        {selectedResource && (
          <div className="mb-6 text-gray-800 font-medium">
            <p className="mb-1">Rate: ₹{getSelectedResourceRate()} per day</p>
            <p className="mb-1">Total Days: {Object.values(workDays).filter(Boolean).length}</p>
            <p>Total Amount: ₹{getSelectedResourceRate() * Object.values(workDays).filter(Boolean).length}</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!selectedResource || !Object.values(workDays).some(Boolean)}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md text-base font-semibold disabled:opacity-50 hover:bg-blue-700"
        >
          Submit
        </button>
      </div>

      {entries.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Submitted Entries</h2>
            <button
              onClick={downloadCSV}
              className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700"
            >
              Generate Report
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">RESOURCE</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">DAYS OF THE WEEK</th>
                  <th scope="col" className="px-6 py-3 text-right text-sm font-semibold text-gray-900">WORK DAYS</th>
                  <th scope="col" className="px-6 py-3 text-right text-sm font-semibold text-gray-900">TOTAL (₹)</th>
                  <th scope="col" className="px-6 py-3 text-right text-sm font-semibold text-gray-900">JAMA (₹)</th>
                  <th scope="col" className="px-6 py-3 text-right text-sm font-semibold text-gray-900">NET PAYMENT (₹)</th>
                  <th scope="col" className="px-6 py-3 text-center text-sm font-semibold text-gray-900">PAID</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map((entry, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.resource}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.daysOfWeek}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">{entry.workDays}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">{entry.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">{entry.jama}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">{entry.total - entry.jama}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <input
                        type="checkbox"
                        checked={entry.paid}
                        onChange={() => handlePaidChange(index)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}