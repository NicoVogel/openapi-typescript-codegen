import { EOL } from 'os';

export function format(s: string): string {
    let indent: number = 0;
    let lines = s.split(EOL);
    lines = lines.map(line => {
        line = line.trim().replace(/^\*/g, ' *');
        let i = indent;
        if (line.endsWith('(') || line.endsWith('{') || line.endsWith('[')) {
            indent++;
        }
        if ((line.startsWith(')') || line.startsWith('}') || line.startsWith(']')) && i) {
            indent--;
            i--;
        }
        return `${'    '.repeat(i)}${line}`;
    });
    return lines.join(EOL);
}
