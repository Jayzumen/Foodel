"use client";

const RemoveButton = ({ id }: { id: string }) => {
  async function removeItem() {
    const res = await fetch(`/api/db/${id.split("_")[1]}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
    console.log(res);
  }

  return <button onClick={removeItem}>X</button>;
};

export default RemoveButton;
