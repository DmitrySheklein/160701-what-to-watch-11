import { Helmet } from 'react-helmet-async';

import ErrorScreen from 'src/components/error-screen/error-screen';
import { PageTitles } from 'src/const';

const Page404 = () => (
  <>
    <Helmet>
      <title>{PageTitles.Page404}</title>
    </Helmet>

    <ErrorScreen statusCode={404} />
  </>
);

export default Page404;
