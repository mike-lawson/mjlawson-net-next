import Header from './Header';

type Props = {
  children: JSX.Element;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <div className="p-5 sm:px-16 md:px-0 md:max-w-xl lg:max-w-2xl md:m-auto">{children}</div>
    </div>
  );
}
