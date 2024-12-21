import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@app/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@app/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@app/components/ui/alert-dialog';
import { Survey } from '@app/types/api';

interface SurveyCardProps {
  survey: Survey;
  onDelete: (id: string) => void;
}

const SurveyCard: React.FC<SurveyCardProps> = ({
  survey,
  onDelete,
}) => {
  let copyLinkToClipBoard = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/survey/${survey.id}/submit-response`
    );
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{survey.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">
          {survey.description}
        </p>
        <div className="flex justify-between">
          <Link to={`/survey/${survey.id}`}>
            <Button variant="outline">View</Button>
          </Link>
          <Link to={`/survey/${survey.id}/update`}>
            <Button variant="outline">Update</Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently
                  delete your survey and remove all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(survey.id)}
                >
                  Delete Survey
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <button
            className="text-blue-500"
            onClick={copyLinkToClipBoard}
          >
            Share link{' '}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SurveyCard;
