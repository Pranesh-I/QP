import { createBrowserRouter } from "react-router-dom";

import UploadPage from "../pages/UploadPage";
import QuestionBankPage from "../pages/QuestionBankPage";
import QuestionDetailPage from "../pages/QuestionDetailPage";
import PaperListPage from "../pages/PaperListPage";

// Application route configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <UploadPage />,
  },

  {
    path: "/questions",
    element: <QuestionBankPage />,
  },

  {
    path: "/questions/:id",
    element: <QuestionDetailPage />,
  },

  {
    path: "/papers",
    element: <PaperListPage />,
  },
]);

export default router;