export const getGradientByIndex = (index: number) => {
  const gradients = [
    "from-indigo-500 to-purple-600",
    "from-blue-500 to-indigo-600",
    "from-purple-500 to-pink-600",
    "from-green-500 to-teal-600",
    "from-orange-500 to-red-600",
    "from-teal-500 to-cyan-600",
  ];
  return gradients[index % gradients.length];
};
