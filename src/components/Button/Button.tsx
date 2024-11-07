import { ComponentProps } from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

type ButtonThemeType = 'primary' | 'success' | 'danger';
type ButtonSizeType = 'small' | 'large';

interface ButtonProps extends ComponentProps<'button'> {
	theme?: ButtonThemeType;
	size?: ButtonSizeType;
}

export function Button({ className, children, theme, size, ...props }: ButtonProps) {
	return (
		<button className={clsx(className, styles.button)} data-theme={theme} data-size={size} {...props}>
			{children}
		</button>
	);
}
