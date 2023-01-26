const Button = ({ text, action, icon }) => {
  return (
    <button
      className={`rounded-lg  bg-purple-700 px-6 py-3 text-xl font-medium capitalize text-white
    `}
      onClick={action}
    >
      {text}
      {icon}
    </button>
  );
};

export default Button;
