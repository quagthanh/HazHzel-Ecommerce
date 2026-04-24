import React from "react";
export default async function DetailUserPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  return <p>This is detail user page {id} </p>;
}
