import React, { memo, useRef, useEffect } from 'react';
import usePrevious from '../../../lib/usePrevious';

export interface SingleOTPInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
  secure?: boolean;
}

export function SingleOTPInputComponent(props: SingleOTPInputProps) {
  const { focus, autoFocus, secure, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = usePrevious(!!focus);
  useEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (secure) {
        inputRef.current.type="password"
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return <input ref={inputRef} {...rest} />;
}

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;
