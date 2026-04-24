import Verify from "@/components/common/auth/verify";

export default async function verifyPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <Verify id={id} />;
}
