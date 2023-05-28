import { FC, PropsWithChildren } from 'react';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';

type THeader = PropsWithChildren<{
  className?: string;
  withUserBlock?: boolean;
}>;
const Header: FC<THeader> = ({ className = '', children, withUserBlock = true }) => (
  <header className={`page-header ${className}`}>
    <Logo />
    {children}
    {withUserBlock && <UserBlock />}
  </header>
);

export default Header;
