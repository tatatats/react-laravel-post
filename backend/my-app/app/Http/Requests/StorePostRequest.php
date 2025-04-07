<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // 認可が必要なければ true
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'タイトルは必須です。',
            'title.string' => 'タイトルは文字列で指定してください。',
            'content.required' => '本文は必須です。',
            'content.string' => '本文は文字列で指定してください。',
            'user_id.required' => 'ユーザーIDは必須です。',
        ];
    }
}
