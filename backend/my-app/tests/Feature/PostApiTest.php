<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Post;
use App\Models\User;

class PostApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_post_list()
    {
        // ユーザー作成
        $user = User::factory()->create();

        // ポスト作成
        Post::factory()->count(3)->create();

        // 認証付きでAPIを叩く
        $response = $this
            ->actingAs($user, 'sanctum') // ← Sanctum使ってる場合
            ->getJson('/api/posts');

        $response->assertStatus(200)
                ->assertJsonCount(3);
    }

    public function test_authenticated_user_can_create_post()
    {
        // ユーザー作成
        $user = User::factory()->create();

        // リクエストデータ
        $postData = [
            'title' => 'テスト投稿',
            'content' => 'これはテスト用の本文です。',
            'user_id' => $user->id,
        ];

        // 認証付きPOSTリクエスト
        $response = $this
            ->actingAs($user, 'sanctum')
            ->postJson('/api/posts', $postData);

        // レスポンスチェック
        $response->assertStatus(201)
                 ->assertJsonFragment($postData);

        // DBに保存されてることを確認
        $this->assertDatabaseHas('posts', $postData);
    }

    public function test_authenticated_user_can_update_post()
    {
        // ユーザーと投稿を作成
        $user = User::factory()->create();
        $post = Post::factory()->create([
            'user_id' => $user->id,
        ]);

        // 更新データ
        $updateData = [
            'title' => '更新されたタイトル',
            'content' => '更新された本文',
            'user_id' => $user->id,
        ];

        // 認証付きで PUT リクエストを送信
        $response = $this
            ->actingAs($user, 'sanctum')
            ->putJson("/api/posts/{$post->id}", $updateData);

        // レスポンス確認
        $response->assertStatus(200)
                ->assertJsonFragment($updateData);

        // DBが更新されたか確認
        $this->assertDatabaseHas('posts', $updateData);
    }

    public function test_authenticated_user_can_delete_post()
    {
        // ユーザーと投稿を作成
        $user = User::factory()->create();
        $post = Post::factory()->create([
            'user_id' => $user->id,
        ]);

        $this->assertDatabaseHas('posts', ['id' => $post->id]);

        // 認証付きで DELETE リクエスト送信
        $response = $this
            ->actingAs($user, 'sanctum')
            ->deleteJson("/api/posts/{$post->id}");

        // ステータス確認（204 No Content が一般的）
        $response->assertStatus(204);

        // DBに存在しないことを確認
        $this->assertDatabaseMissing('posts', [
            'id' => $post->id,
        ]);
    }

    public function test_post_creation_fails_without_title_and_content()
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user, 'sanctum')
            ->postJson('/api/posts', []); // 両方空

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['title', 'content']);
    }

    public function test_post_creation_fails_without_title()
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user, 'sanctum')
            ->postJson('/api/posts', [
                'content' => '本文だけある',
                'user_id' => $user->id,
            ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['title']);
    }

    public function test_post_creation_fails_without_content()
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user, 'sanctum')
            ->postJson('/api/posts', [
                'title' => 'タイトルだけある',
                'user_id' => $user->id,
            ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['content']);
    }

    public function test_guest_cannot_create_post()
    {
        $response = $this->postJson('/api/posts', [
            'title' => 'テスト',
            'content' => '未認証ユーザー',
        ]);

        $response->assertStatus(401);
    }

    public function test_post_list_response_structure()
    {
        $user = User::factory()->create();
        Post::factory()->count(3)->create();

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/posts');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    '*' => [ // 複数件の場合は * を使う
                        'id',
                        'title',
                        'content',
                        'created_at',
                        'updated_at',
                        'user_id',
                    ]
                ]);
    }

    public function test_post_detail_response_structure()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();

        $response = $this->actingAs($user, 'sanctum')->getJson("/api/posts/{$post->id}");

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'id',
                    'title',
                    'content',
                    'created_at',
                    'updated_at',
                    'user_id',
                ]);
    }

    public function test_user_cannot_update_others_post()
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $otherUser->id]);

        $response = $this
            ->actingAs($user, 'sanctum')
            ->putJson("/api/posts/{$post->id}", [
                'title' => '不正更新',
                'content' => '他人の投稿です',
                'user_id' => $otherUser->id,
            ]);

        $response->assertStatus(403);
    }

    public function test_user_cannot_delete_others_post()
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $otherUser->id]);

        $response = $this
            ->actingAs($user, 'sanctum')
            ->deleteJson("/api/posts/{$post->id}");

        $response->assertStatus(403);
    }
}