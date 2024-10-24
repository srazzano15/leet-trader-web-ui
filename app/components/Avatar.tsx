interface AvatarProps {
  source: string;
}

const Avatar: React.FC<AvatarProps> = ({ source }) => (
  <img src={source} width={30} height={30} className="rounded-full mr-2" alt="Avatar Image" />
);

export default Avatar;
