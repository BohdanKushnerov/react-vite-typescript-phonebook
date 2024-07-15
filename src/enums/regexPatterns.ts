export enum RegexPatterns {
  NamePattern = "^[a-zA-Zа-яА-ЯґҐєЄіІїЇ0-9]+([' -][a-zA-Zа-яА-ЯґҐєЄіІїЇ0-9]*)*$",
  NumberPattern = '^\\+?\\d{0,3}[\\s-]?\\(?\\d{1,3}\\)?[\\s-]?\\d{1,4}[\\s-]?\\d{1,4}[\\s-]?\\d{1,9}$',
}
