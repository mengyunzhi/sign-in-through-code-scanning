/**
 * 分页
 */
export class Page<T> {
  content: T[];
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  totalPages: number;

  constructor(data: {
    content: T[],
    last?: boolean,
    number: number,
    size: number,
    numberOfElements: number,
    first?: boolean,
    totalPages?: number
  }) {
    this.content = data.content;
    this.number = data.number;
    this.size = data.size;
    this.numberOfElements = data.numberOfElements;
    if (data.last !== undefined) {
      this.last = data.last;
    } else {
      this.last = (this.number + 1) * this.size >= this.numberOfElements;
    }

    if (data.first !== undefined) {
      this.first = data.first;
    } else {
      this.first = this.number === 0;
    }

    if (data.totalPages !== undefined) {
      this.totalPages = data.totalPages;
    } else {
      this.totalPages = Math.ceil(this.numberOfElements / this.size);
    }
  }
}
