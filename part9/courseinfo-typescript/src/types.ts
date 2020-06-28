export interface CoursePart {
  name: string
  exerciseCount: number
}

export interface HeaderProps {
  courseName: string
}

export interface ContentProps {
  courseParts: Array<CoursePart>
}

export interface TotalProps {
  courseParts: Array<CoursePart>
}
