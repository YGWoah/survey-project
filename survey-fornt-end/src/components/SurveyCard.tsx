import React from 'react';
import { Link } from 'react-router-dom';
import { Survey } from '../types';

interface SurveyCardProps {
  survey: Survey;
}

const SurveyCard: React.FC<SurveyCardProps> = ({ survey }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-5">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {survey.title}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {survey.description}
        </p>
      </div>
      <div className="border-t border-gray-200 bg-gray-50 px-5 py-3">
        <Link
          to={`/survey/${survey.id}`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          View details
        </Link>
        <span className="mx-2">•</span>
        <Link
          to={`/survey/${survey.id}/responses`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          View responses
        </Link>
        <span className="mx-2">•</span>
        <Link
          to={`/survey/${survey.id}/submit-response`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          add a response
        </Link>
      </div>
    </div>
  );
};

export default SurveyCard;
