import ActiveLink from '@/components/Common/ActiveLink';
import { IMenu } from '@/types';

const MenuItem = ({ url = '/', title = '', icon }: IMenu) => {
  return (
    <li>
      <ActiveLink url={url}>
        <span>{icon}</span>
        <span className='line-clamp-1 hidden lg:inline-block'>{title}</span>
      </ActiveLink>
    </li>
  );
};

export default MenuItem;
