import { StatusCodes } from 'http-status-codes';
import { Link } from 'react-router-dom';
import { AppRoute } from 'src/const';

type TErrorScreen = {
  statusCode: number;
  redirectTo?: string;
  redirectMessage?: string;
};

export const StatusCodeMap: Record<number, string> = {
  [StatusCodes.BAD_REQUEST]: `${StatusCodes.BAD_REQUEST} request due to invalid syntax`,
  [StatusCodes.NOT_FOUND]: `${StatusCodes.NOT_FOUND} Not Found`,
};

const ErrorScreen = ({
  statusCode,
  redirectTo = AppRoute.Root,
  redirectMessage = 'Вернуться на главную',
}: TErrorScreen) => (
  <div
    className="page-content user-page__content"
    style={{ justifyContent: 'center', textAlign: 'center' }}
  >
    <h1>{StatusCodeMap[statusCode] || statusCode}</h1>
    <div className="user-block" style={{ marginLeft: 0, justifyContent: 'center' }}>
      <Link className="user-block__link" to={redirectTo}>
        {redirectMessage}
      </Link>
    </div>
  </div>
);

export default ErrorScreen;
