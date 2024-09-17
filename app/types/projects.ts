/* eslint-disable @typescript-eslint/no-explicit-any */
export type Project = {
	title: string;
	desc: Desc;
	releaseDate: string;
	link: string;
	placeholder: Placeholder;
	image: string;
	imageAlt: string;
};

type Placeholder = {
	color: Color;
	css: Css;
	base64: string;
	metadata: Metadata;
	pixels: Pixel[][];
	svg: (Svg | (Svg2 | string)[][] | string)[];
};

type Svg2 = {
	fill: string;
	'fill-opacity': number;
	width: number;
	height: number;
	x: number;
	y: number;
};

type Svg = {
	xmlns: string;
	width: string;
	height: string;
	shapeRendering: string;
	preserveAspectRatio: string;
	viewBox: string;
	style: Style;
};

type Style = {
	position: string;
	top: string;
	left: string;
	transformOrigin: string;
	transform: string;
	right: number;
	bottom: number;
};

type Pixel = {
	r: number;
	g: number;
	b: number;
};

type Metadata = {
	width: number;
	height: number;
	format: string;
	size: number;
	space: string;
	channels: number;
	depth: string;
	density: number;
	chromaSubsampling: string;
	isProgressive: boolean;
	resolutionUnit: string;
	hasProfile: boolean;
	hasAlpha: boolean;
	icc: Icc;
};

type Icc = {
	type: string;
	data: number[];
};

type Css = {
	backgroundImage: string;
	backgroundPosition: string;
	backgroundSize: string;
	backgroundRepeat: string;
};

type Color = {
	r: number;
	g: number;
	b: number;
	hex: string;
};

type Desc = {
	json: Json;
};

type Json = {
	data: Data;
	content: Content2[];
	nodeType: string;
};

type Content2 = {
	data: Data;
	content: Content[];
	nodeType: string;
};

type Content = {
	data: Data;
	marks: any[];
	value: string;
	nodeType: string;
};

type Data = any;
