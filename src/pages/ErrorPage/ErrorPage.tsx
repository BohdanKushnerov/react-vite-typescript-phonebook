import { useNavigate } from 'react-router-dom';

import { AppPaths } from '@enums/appPaths';

import { MainButton, PageContainer } from '@assets/styles/common';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(AppPaths.BasePath);
  };

  return (
    <PageContainer>
      <h1>Sorry, page not found</h1>
      <MainButton onClick={handleNavigate}>Back to Home page</MainButton>
    </PageContainer>
  );
};

export default ErrorPage;
