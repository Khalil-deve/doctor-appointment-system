import { ArrowLeft} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BackMenu({ path, name }) {
    return (
        <Link
            to={path}
            className="flex items-center"
        >
            <ArrowLeft size={16} className="h-5 w-5 mr-2" /> Back to {name}
        </Link>
    )
}