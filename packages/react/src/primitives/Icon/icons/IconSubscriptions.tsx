import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconSubscriptions = (props) => {
  const { className, ...rest } = props;
  return (
    <View
      as="span"
      width="1em"
      height="1em"
      className={classNames(ComponentClassNames.Icon, className)}
      {...rest}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 6H20V8H4V6ZM6 2H18V4H6V2ZM20 10H4C2.9 10 2 10.9 2 12V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V12C22 10.9 21.1 10 20 10ZM20 20H4V12H20V20ZM10 12.73V19.26L16 16L10 12.73Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
