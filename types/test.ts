/* These test cases were imported from https://github.com/DefinitelyTyped/DefinitelyTyped
 * and includes previous contributions from the DefinitelyTyped community.
 * For full history prior to their migration to handlebars.js, please see:
 * https://github.com/DefinitelyTyped/DefinitelyTyped/commits/1ce60bdc07f10e0b076778c6c953271c072bc894/types/handlebars/handlebars-tests.ts
 */

import * as Handlebars from 'handlebars';

const context = {
  author: { firstName: 'Alan', lastName: 'Johnson' },
  body: 'I Love Handlebars',
  comments: [{
    author: { firstName: 'Yehuda', lastName: 'Katz' },
    body: 'Me too!'
  }]
};
Handlebars.registerHelper('fullName', (person: typeof context.author) => {
  return person.firstName + ' ' + person.lastName;
});

Handlebars.registerHelper('agree_button', function(this: any) {
  return new Handlebars.SafeString(
    '<button>I agree. I ' + this.emotion + ' ' + this.name + '</button>'
  );
});

const source1 = '<p>Hello, my name is {{name}}. I am from {{hometown}}. I have ' +
                '{{kids.length}} kids:</p>' +
                '<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>';
const template1 = Handlebars.compile(source1);
template1({ name: "Alan", hometown: "Somewhere, TX", kids: [{name: "Jimmy", age: 12}, {name: "Sally", age: 4}]});

Handlebars.registerHelper('link_to', (context: typeof post) => {
  return '<a href="' + context.url + '">' + context.body + '</a>';
});
const post = { url: "/hello-world", body: "Hello World!" };
const context2 = { posts: [post] };
const source2 = '<ul>{{#posts}}<li>{{{link_to this}}}</li>{{/posts}}</ul>';
const template2: HandlebarsTemplateDelegate<{ posts: { url: string, body: string }[] }> = Handlebars.compile(source2);
template2(context2);

Handlebars.registerHelper('link_to', (title: string, context: typeof post) => {
  return '<a href="/posts' + context.url + '">' + title + '!</a>';
});
const context3 = { posts: [{url: '/hello-world', body: 'Hello World!'}] };
const source3 = '<ul>{{#posts}}<li>{{{link_to "Post" this}}}</li>{{/posts}}</ul>';
const template3 = Handlebars.compile<typeof context3>(source3);
template3(context3);

const source4 = '<ul>{{#people}}<li>{{#link}}{{name}}{{/link}}</li>{{/people}}</ul>';
Handlebars.registerHelper('link', function(this: any, context: any) {
  return '<a href="/people/' + this.id + '">' + context.fn(this) + '</a>';
});
const template4 = Handlebars.compile<{ people: { name: string, id: number }[] }>(source4);
const data2 = { 'people': [
    { 'name': 'Alan', 'id': 1 },
    { 'name': 'Yehuda', 'id': 2 }
]};
template4(data2);

const source5 = '<ul>{{#people}}<li>{{> link}}</li>{{/people}}</ul>';
Handlebars.registerPartial('link', '<a href="/people/{{id}}">{{name}}</a>');
const template5 = Handlebars.compile(source5);
const data3 = { 'people': [
    { 'name': 'Alan', 'id': 1 },
    { 'name': 'Yehuda', 'id': 2 }
]};
template5(data3);

const source6 = '{{#list nav}}<a href="{{url}}">{{title}}</a>{{/list}}';
const template6 = Handlebars.compile(source6);
Handlebars.registerHelper('list', (context, options: Handlebars.HelperOptions) => {
  let ret = "<ul>";
  for(let i=0, j=context.length; i<j; i++) {
    ret = ret + "<li>" + options.fn(context[i]) + "</li>";
  }
  return ret + "</ul>";
});
template6([{url:"", title:""}]);


const escapedExpression = Handlebars.Utils.escapeExpression('<script>alert(\'xss\');</script>');

Handlebars.helpers !== undefined;

const parsedTmpl = Handlebars.parse('<p>Hello, my name is {{name}}.</p>', {
  srcName: "/foo/bar/baz.hbs",
  ignoreStandalone: true
});

const parsedTmplWithoutOptions = Handlebars.parse('<p>Hello, my name is {{name}}.</p>');

// Custom partial resolution.
const originalResolvePartial = Handlebars.VM.resolvePartial;
Handlebars.VM.resolvePartial = <T>(partial: HandlebarsTemplateDelegate<T> | undefined, context: any, options: Handlebars.ResolvePartialOptions): HandlebarsTemplateDelegate<T> => {
  const name = options.name.replace(/my/,'your');
  // transform name.
  options.name = name;
  return originalResolvePartial(partial, context, options);
};


// #1544, allow custom helpers in knownHelpers
Handlebars.compile('test', {
  knownHelpers: {
    each: true,
    customHelper: true
  }
});

Handlebars.compile('test')({},{allowCallsToHelperMissing: true});
