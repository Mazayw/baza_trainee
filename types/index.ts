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

export interface IProjectTeamMember {
	userId: {
		_id: Types.ObjectId;
		name?: string;
	};
	roleId: {
		_id: Types.ObjectId;
		name?: string;
	};
}

export interface IStack extends IDocumentResult<IStack> {
	stackId: any;
	_id: Types.ObjectId;
	name: string;
}

export interface IProject extends IDocumentResult<IProject> {
	title: ILanguageSelector<string>;
	imageUrl: string;
	deployUrl?: string;
	stack: Array<{
		stackId: Partial<IStack>;
	}>;
	isTeamRequired: boolean;
	creationDate: number;
	launchDate: number;
	complexity: number;
	teamMembers: Partial<IProjectTeamMember>[];
	_id: Types.ObjectId;
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

export interface IAchievements {
	employed: {
		type: number;
	};
}

export interface IProjectResponse {
	title: {
		en: string;
		pl: string;
		ua: string;
	};
	_id: string;
	imageUrl: string;
	deployUrl?: string;
	stack: Array<{
		_id: string;
		name: string;
	}>;
	isTeamRequired: boolean;
	creationDate: number;
	launchDate: number;
	complexity: number;
	teamMembers: Array<{
		user: {
			name: string;
			_id: string;
		};
		role: {
			name: string;
			_id: string;
		};
	}>;
}

export interface IHeroSlider extends IDocumentResult<IHeroSlider> {
	title: ILanguageSelector<string>;
	subtitle: ILanguageSelector<string>;
	imageUrl: string;
}
