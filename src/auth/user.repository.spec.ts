import { UserRepository } from './user.repository';
import { Test } from '@nestjs/testing';
import { User } from './user.entity';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

const mockCredentialsDto = { username: 'test-username', password: 'test-password' };

describe('UserRepository', () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    let save;
    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('successfully signs up the user', () => {
      save.mockResolvedValue(new User());
      expect(userRepository.signUp(mockCredentialsDto)).resolves.not.toThrow();
    });

    it('throws a conflict exception as username already exists', () => {
      save.mockRejectedValue({ code: '23505' });
      expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(ConflictException);
    });

    it('throws an unexpected error', () => {
      save.mockRejectedValue({ code: 'unexpected-error' });
      expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('signIn', () => {
    let user;
    beforeEach(() => {
      userRepository.findOne = jest.fn();
      user = new User();
      user.username = 'test-username';
      userRepository.validatePassword = jest.fn();
    });

    it('returns the username as validation is successfully', async () => {
      userRepository.findOne.mockResolvedValue(user);
      userRepository.validatePassword.mockReturnValue(true);
      const result = await userRepository.signIn(mockCredentialsDto);
      expect(result).toEqual(user.username);
    });

    it('returns null as user can not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      const result = await userRepository.signIn(mockCredentialsDto);
      expect(userRepository.validatePassword).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('returns null as password is invalid', async () => {
      userRepository.findOne.mockResolvedValue(user);
      userRepository.validatePassword.mockReturnValue(false);
      const result = await userRepository.signIn(mockCredentialsDto);
      expect(userRepository.validatePassword).toHaveBeenCalled();
      expect(result).toBeNull();
    });

  });
});