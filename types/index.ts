import { Request } from 'express';
import { ObjectId, Types } from 'mongoose';

export interface ILanguageSelector<T> {
	en: T;
	pl: T;
	ua: T;
}

export interface IAuthenticatedRequest extends Request {
	userId?: string;
}

export interface IDocumentResult<T> {
	_doc: T;
}

export interface IUser extends IDocumentResult<IUser> {
	_id: ObjectId;
	createdAt: Date;
	updatedAt: Date;
	name: string;
	email: string;
	passwordHash: string;
}

export interface ITestimonial extends IDocumentResult<ITestimonial> {
	name: ILanguageSelector<string>;
	review: ILanguageSelector<string>;
	date: number;
	imageUrl: string;
}

export interface ITeamMember extends IDocumentResult<ITestimonial> {
	name: string;
	profileUrl?: string;
}

export interface ITeamMemberRole extends IDocumentResult<ITeamMemberRole> {
	name: ILanguageSelector<string>;
}

interface IProjectTeamMember {
	user: {
		_id: Types.ObjectId;
		name: string;
	};
	role: {
		_id: Types.ObjectId;
		name: string;
	};
}

export interface IProject extends IDocumentResult<IProject> {
	title: string;
	imageUrl: string;
	status: string;
	description: string;
	creationDate: number;
	launchDate: number;
	complexity: number;
	teamMembers: IProjectTeamMember[];
}

export interface IPartner extends IDocumentResult<IPartner> {
	homeUrl?: string;
	imageUrl: string;
}

export interface IContacts extends IDocumentResult<IContacts> {
	contacts: {
		contactsDataList: {
			phone1: number;
			phone2: number;
			email: string;
		};
		socialsMediaList: {
			linkedin: string;
			facebook: string;
		};
	};
}

export interface IStack extends IDocumentResult<IStack> {
	name: string;
}
