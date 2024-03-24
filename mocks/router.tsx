import { useRouter as useRouterOriginal } from "next/navigation";

export const useRouter = jest.fn();
useRouter.mockImplementation(() => ({
  ...jest.requireActual("next/navigation"), //using the actual implementation for useRouter
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  pathname: "/",
}));

export default useRouter();
