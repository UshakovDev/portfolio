const BitrixIcon = ({ className }) => {
  return (
    <img
      src="/icons/bitrix.svg"
      alt="1C-Bitrix"
      className={`block align-middle object-contain relative -top-[5px] ${className || ""}`}
      loading="lazy"
      decoding="async"
    />
  );
};

export default BitrixIcon;


