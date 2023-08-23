import { useNavigate } from 'react-router-dom';
import { MainButton, PageContainer } from '@assets/styles/common';

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <PageContainer>
      <h1>Sorry, page not found</h1>
      <MainButton onClick={handleNavigate}>Back to Home page</MainButton>
    </PageContainer>
  );
}
