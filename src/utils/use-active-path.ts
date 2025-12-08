import { closest } from 'fastest-levenshtein'

type getActivePathProps = {
    path: string;
    paths: string[];
    ignorePaths?: string[];
}

export const getActivePath = ({ path, paths, ignorePaths }: getActivePathProps) => {
    const closestPath = closest(path, paths.concat(ignorePaths || []))
    const index = paths.indexOf(closestPath)
    return { active: closestPath, activeIndex: index }
}