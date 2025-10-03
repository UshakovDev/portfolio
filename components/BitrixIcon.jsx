const BitrixIcon = ({ className }) => {
  return (
    <img
      src="/icons/bitrix.svg"
      alt="1C-Bitrix"
      className={`block align-middle w-[1.5em] h-[1.5em] object-contain relative -top-[4px] ${className || ""}`}
      loading="lazy"
      decoding="async"
    />
  );
};

export default BitrixIcon;


