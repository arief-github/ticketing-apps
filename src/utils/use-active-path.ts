import { closest } from 'fastest-levenshtein'

type getActivePathProps = {
    path: string;
    paths: string[];
}

export const getActivePath = ({ path, paths }: getActivePathProps) => {
    const closestPath = closest(path, paths)
    const index = paths.indexOf(closestPath)
    return { active: closestPath, activeIndex: index }
}