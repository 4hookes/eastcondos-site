interface TeamCardProps {
  name: string;
  role: string;
  oneLiner: string;
  photo?: string;
}

export default function TeamCard({ name, role, oneLiner, photo }: TeamCardProps) {
  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
      {photo ? (
        <img
          src={photo}
          alt={`${name} - ${role}`}
          className="w-16 h-16 rounded-full mx-auto object-cover"
        />
      ) : (
        <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto">
          {getInitials(name)}
        </div>
      )}
      <h3 className="font-bold text-navy mt-4">{name}</h3>
      <p className="text-sm text-sage mt-1">{role}</p>
      <p className="text-sm text-body mt-2">{oneLiner}</p>
    </div>
  );
}
